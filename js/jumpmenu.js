class JumpMenuElement extends HTMLElement {
  constructor() {
    super();
    this._headerTag = this.getAttribute('headerTag');
    this._title = this.sanitize(this.getAttribute('title'));
    this._initialized = false;
  }

  connectedCallback() {
    this.setAttribute('headerTag', this._headerTag);
    this.setAttribute('data-initialized', 'true');
    this._initializeEditorListener();
    this._initialBuild();
    this._ensureBuild();
  }

  disconnectedCallback() {
    document.removeEventListener('DOMContentLoaded', this._ensureBuild);
  }

  static get observedAttributes() {
    return ['headertag', 'title'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'headertag') {
      this._headerTag = newValue;
    }
    if (name === 'title') {
      this._title = this.sanitize(newValue);
    }
    this._initialBuild();
    this._ensureBuild();
  }

  sanitize(input) {
    const element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML;
  }

  createJumps(headers) {
    return headers.map(header => {
      const textContent = header.textContent.trim();
      const id = textContent.replace(/\s+/g, '').toLowerCase();
      header.setAttribute('id', id);
      return `<li><a href="#${id}">${textContent}</a></li>`;
    }).join('');
  }

  collectHeaders() {
    let container;

    if (this.closest('.ck .ck-editor__main')) {
      container = this.closest('.ck .ck-editor__main');
    } else {
      container = this.closest('#block-boulder-base-content');
    }

    if (!container) return [];

    return Array.from(container.querySelectorAll(this._headerTag));
  }

  _initialBuild() {
    const note = this.closest('.ck .ck-editor__main') ? '<p><em>Note: Additional headers may be found upon save. If no matching headers found, Jump Menu will be hidden.</em></p>' : '';

    this.innerHTML = `
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

    const ul = this.querySelector('.ucb-jump-menu-links ul');
    if (jumpLinks === '') {
      this.style.display = 'none';
    } else {
      this.style.display = 'block';
      ul.innerHTML = jumpLinks;
    }
  }

  _initializeEditorListener() {
    if (window.CKEDITOR && window.CKEDITOR.instances) {
      Object.values(window.CKEDITOR.instances).forEach(editor => {
        editor.on('instanceReady', () => {
          this.build();
        });
        editor.on('change:data', () => this.build());
      });
    }
  }

  // Sometimes headers are not available and will load empty only if in CKEditor5 window. Can't figure out if this is because this is a web component, a DOM order thing, etc.
  // This helps ensure that there are headers and will try to build the <li> jump menu items AFTER it loads the initial container for our jump menu.
  async _ensureBuild() {
    await this._domReady();

    const checkAndBuild = () => {
      const headers = this.collectHeaders();
      if (headers.length > 0) {
        this.build();
      } else {
        requestAnimationFrame(checkAndBuild); // Check again on the next frame
      }
    };

    checkAndBuild();
  }

  _domReady() {
    return new Promise((resolve) => {
      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        resolve();
      } else {
        document.addEventListener('DOMContentLoaded', resolve);
      }
    });
  }
}

customElements.define('ucb-jump-menu', JumpMenuElement);
