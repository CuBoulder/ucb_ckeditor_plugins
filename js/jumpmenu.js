console.log("JumpMenu script loaded");

class JumpMenuElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.build();
  }

  static get observedAttributes() {
    return ['headertag', 'title'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'headertag' || name === 'title') {
      this.build();
    }
  }

  build() {
    this.innerHTML = `
      <div class="ucb-jump-menu-outer-container">
        <div class="ucb-jump-menu-title">
          <span class="ucb-jump-menu-label">${this.getAttribute('title')}</span>
        </div>
        <div class="ucb-jump-menu-links">
          <p>My header tag is a ${this.getAttribute('headerTag')}
        </div>
      </div>
    `;
  }
}

customElements.define('ucb-jump-menu', JumpMenuElement);
