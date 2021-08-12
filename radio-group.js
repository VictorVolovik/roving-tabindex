var VK_ENTER = 13;
var VK_SPACE = 32;
const VK_LEFT = 37;
const VK_UP = 38;
const VK_RIGHT = 39;
const VK_DOWN = 40;

class RadioGroup extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute("role", "radiogroup");
    this.radios = Array.from(this.querySelectorAll("radio-button"));

    // setup initial state
    if (this.hasAttribute("selected")) {
      this._selected = selected;
      this.radios[selected].setAttribute("tabindex", 0);
      this.radios[selected].setAttribute("aria-checked", true);
    } else {
      this.selected = 0;
      this.radios[0].setAttribute("tabindex", 0);
    }

    this.radios[0].setAttribute("tabindex", 0);

    this.addEventListener("keydown", this.handleKeyDown.bind(this));
    this.addEventListener("click", this.handleClick.bind(this));
  }

  handleKeyDown(e) {
    switch (e.keyCode) {
      case VK_UP:
      case VK_LEFT: {
        e.preventDefault();

        if (this.selected === 0) {
          this.selected = this.radios.length - 1;
        } else {
          this.selected--;
        }

        break;
      }

      case VK_DOWN:
      case VK_RIGHT: {
        e.preventDefault();

        if (this.selected === this.radios.length - 1) {
          this.selected = 0;
        } else {
          this.selected++;
        }

        break;
      }
    }
  }

  handleClick(e) {
    e.preventDefault();
    /* A check is done to allow clicks on custom radio-buttons only */
    if (e.target.nodeName === "RADIO-BUTTON") {
      this.selected = this.radios.indexOf(e.target);
    }
  }

  set selected(idx) {
    if (isFinite(this.selected)) {
      // set the old button to tabindex -1
      let prevSelected = this.radios[this.selected];
      prevSelected.tabIndex = -1;
      prevSelected.removeAttribute("aria-checked", false);
    }

    // set the new button to tabindex 0 and focus it
    let newSelected = this.radios[idx];
    newSelected.tabIndex = 0;
    newSelected.focus();
    newSelected.setAttribute("aria-checked", true);

    this.setAttribute("selected", idx);
    this._selected = idx;
  }

  get selected() {
    return this._selected;
  }
}

window.customElements.define("radio-group", RadioGroup);
