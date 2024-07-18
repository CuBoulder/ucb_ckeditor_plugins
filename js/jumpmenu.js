class JumpMenuElement extends HTMLElement {
  constructor() {
    super();
    this._headerTag = this.getAttribute('headerTag');
    this._title = this.sanitize(this.getAttribute('title'));
  }

  // Hot reload, re-run build
  connectedCallback() {
    this.setAttribute('headerTag', this._headerTag);
    this.build();
    // Force attributeChangedCallback to run after initial build, this just gets us a reload in the editor to show our headers
    this.setAttribute('data-initialized', 'true');
  }

  // Hot reload
  static get observedAttributes() {
    return ['headertag', 'title'];
  }

  // Hot reload
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'headertag') {
      this._headerTag = newValue;
    }
    if (name === 'title') {
      this._title = this.sanitize(newValue);
    }
    this.build();
  }

  // This just sanitizes the title input to prevent any malicious code
  sanitize(input) {
    const element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML;
  }

  // Create the links on our headers
  createJumps(headers) {
    return headers.map(header => {
      const textContent = header.textContent.trim();
      const id = header.textContent.replace(/\s+/g, '').toLowerCase();
      header.setAttribute('id', id);
      return `<li><a href="#${id}">${textContent}</a></li>`;
    }).join('');
  }

  collectHeaders() {
    let container;

    // Check if within the editor or rendered on a page
    if (this.closest('.ck .ck-editor__main')) {
      container = this.closest('.ck .ck-editor__main');
    } else {
      container = this.closest('#block-boulder-base-content');
    }

    if (!container) return [];

    // Find headers within the appropriate container
    return Array.from(container.querySelectorAll(this._headerTag));
  }

  build() {
    const headers = this.collectHeaders();
    const jumpLinks = this.createJumps(headers);
    // Just for ckeditor, we can't see the whole page so we may have more links.
    const note = this.closest('.ck .ck-editor__main') ? '<p><em>Note: Additional headers may be found upon save. If no matching headers found, Jump Menu will be hidden.</em></p>' : '';
    // Toggling the hide if not in editor and no links.
    if (jumpLinks === '' && note === '') {
      this.style.display = 'none';
    } else {
      this.style.display = 'block';
      // Render the jump menu
      this.innerHTML = `
        <div class="ucb-jump-menu-outer-container">
          <div class="ucb-jump-menu-title">
            <span class="ucb-jump-menu-label">${this._title}</span>
          </div>
          <div class="ucb-jump-menu-links">
            ${note}
            <ul>${jumpLinks}</ul>
          </div>
        </div>
      `;
    }
  }
}

customElements.define('ucb-jump-menu', JumpMenuElement);
