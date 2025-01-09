class JumpMenuElement extends HTMLElement {
    constructor() {
        super();
        this._headerTag = this.getAttribute("headerTag");
        this._title = this.sanitize(this.getAttribute("data-title"));
        this._initialized = false;
        this._maxRetries = 1; // Maximum number of retries for ensuring build

        // Only attach shadow root if within #layout-builder
        if (this.closest("#layout-builder")) {
            this.attachShadow({ mode: "open" });
        }
    }

    connectedCallback() {
        this.setAttribute("headerTag", this._headerTag);
        this.setAttribute("data-initialized", "true");
        this._initializeEditorListener();
        this._initialBuild();
        this._ensureBuild();
    }

    disconnectedCallback() {
        document.removeEventListener("DOMContentLoaded", this._ensureBuild);
    }

    static get observedAttributes() {
        return ["headertag", "data-title"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "headertag") {
            this._headerTag = newValue;
        }
        if (name === "data-title") {
            this._title = this.sanitize(newValue);
        }
        this._initialBuild();
        this._ensureBuild();
    }

    sanitize(input) {
        const element = document.createElement("div");
        element.innerText = input;
        return element.innerHTML;
    }

    createJumps(headers) {
        return headers
            .map((header) => {
                const textContent = header.textContent.trim();
                const id = textContent.replace(/\s+/g, "-").toLowerCase();
                header.setAttribute("id", id);
                return `<li><a href="#${id}">${textContent}</a></li>`;
            })
            .join("");
    }

    collectHeaders() {
        let container;

        if (this.closest(".ck-editor__main")) {
            container = this.closest(".ck-editor__main");
        } else {
            container = this.closest("#block-boulder-base-content");
        }

        if (!container) {
            console.warn("No container found for headers.");
            return [];
        }

        // Collect all headers within the container, excluding those inside 'auxiliary-column' sections
        const headers = Array.from(
            container.querySelectorAll(this._headerTag)
        ).filter((header) => !header.closest(".auxiliary-column"));

        const isVisible = (element) => {
            const style = window.getComputedStyle(element);
            return (
                style.display !== "none" &&
                !element.classList.contains("visually-hidden") &&
                !element.classList.contains("ucb-invisible")
            );
        };

        // Filter out headers that are not visible
        const visibleHeaders = headers.filter((header) => {
            let parent = header.parentElement;

            while (parent && parent !== container) {
                if (!isVisible(parent)) {
                    return false;
                }
                parent = parent.parentElement;
            }

            if (!isVisible(header)) {
                return false;
            }

            const firstChild = header.firstElementChild;
            if (firstChild && !isVisible(firstChild)) {
                return false;
            }

            return true;
        });

        return visibleHeaders;
    }

    _initialBuild() {
        const note = this.closest(".ck-editor__main")
            ? "<p><em>Note: Additional headers may be found upon save. If no matching headers found, Jump Menu will be hidden.</em></p>"
            : "";
        // Shadow root needed to dodge jquery in Layout builder
        const container = this.shadowRoot || this;
        container.innerHTML = `
      <style>
      .ucb-jump-menu-outer-container{
        border-radius: 3px;
        -webkit-background-clip: padding-box;
        -moz-background-clip: padding;
        background-clip: padding-box;
        background-color: #EEEEEE;
        display: block;
        margin-bottom: 20px;
      }

      .ucb-jump-menu-title{
        font-weight: bold;
        background-color: #424242;
        color: #fff;
        padding: 10px;
      }

      .ucb-jump-menu-links{
        padding: 0 10px 10px 10px;
      }

      .ucb-jump-menu-links ul{
        margin: 0;
        padding: 0;
        list-style: none !important;
        list-style-image: none !important;
      }

      .ucb-jump-menu-links li{
        margin: 10px 0;
        padding: 0;
        list-style: none !important;
        list-style-image: none !important;
      }

      .ucb-jump-menu-links li a{
        padding-left: 5px;
        color: #0277bd !important;
        text-decoration: none;
      }

      .ucb-jump-menu-links li::before{
        content: "\f063";
        font-family: "Font Awesome 6 Free - Solid" !important;
        font-weight: 900 !important;
        color: #858585;
      }

      .ck.ck-editor__main .ucb-jump-menu-links li::before{
        content:''
      }

      .ucb-jump-menu{
        display: none;
      }

            </style>
            <div class="ucb-jump-menu-outer-container">
              <div class="ucb-jump-menu-title">
                <span class="ucb-jump-menu-label">${this._title}</span>
              </div>
              <div class="ucb-jump-menu-links">
                ${note}
                <ul></ul>
              </div>
            </div>
          `;
    }

    async build() {
        const headers = this.collectHeaders();
        const jumpLinks = this.createJumps(headers);

        const container = this.shadowRoot || this;
        const ul = container.querySelector(".ucb-jump-menu-links ul");
        const isEditor = this.closest(".ck-editor__main") !== null;

        if (!isEditor && headers.length === 0) {
            this.style.display = "none";
        } else {
            this.style.display = "block";
            ul.innerHTML = jumpLinks;
            const outerContainer = container.querySelector(
                ".ucb-jump-menu-outer-container"
            );
            const titleContainer = container.querySelector(
                ".ucb-jump-menu-title"
            );
            const linksContainer = container.querySelector(
                ".ucb-jump-menu-links"
            );

            outerContainer.style.display = "block";
            titleContainer.style.display = "block";
            linksContainer.style.display = "block";
        }
    }

    _initializeEditorListener() {
        if (window.CKEDITOR && window.CKEDITOR.instances) {
            Object.values(window.CKEDITOR.instances).forEach((editor) => {
                editor.on("instanceReady", () => {
                    this.build();
                });
                editor.on("change:data", () => {
                    this.build();
                });
            });
        }
    }

    async _ensureBuild() {
        await this._domReady();
        let retries = 0;

        const checkAndBuild = () => {
            const headers = this.collectHeaders();
            if (headers.length > 0 || retries >= this._maxRetries) {
                this.build();
            } else {
                retries++;
                requestAnimationFrame(checkAndBuild); // Check again on the next frame
            }
        };

        checkAndBuild();
    }

    _domReady() {
        return new Promise((resolve) => {
            if (
                document.readyState === "complete" ||
                document.readyState === "interactive"
            ) {
                resolve();
            } else {
                document.addEventListener("DOMContentLoaded", resolve);
            }
        });
    }
}

customElements.define("ucb-jump-menu", JumpMenuElement);
