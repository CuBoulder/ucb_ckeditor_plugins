console.log("JumpMenu script loaded");

class JumpMenuElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.build();
  }

  static get observedAttributes() {
    return ['headertag'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'headertag') {
      this.build();
    }
  }

  build() {
    this.innerHTML = `
      <div class="container">
        <p>I'm the jump menu and my targeted tag is ${this.getAttribute('headertag')}</p>
      </div>
    `;
  }
}

customElements.define('ucb-jump-menu', JumpMenuElement);
