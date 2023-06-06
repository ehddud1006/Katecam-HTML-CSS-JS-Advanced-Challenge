import { Component } from '../core/heropy';

export default class TheHeader extends Component {
  constructor() {
    super({
      tagName: 'header',
    });
  }
  render() {
    this.el.innerHTML = /* html */ `
      <a
        href="#/"
        class="logo">
        Main!
      </a>
  
      <a href="#/about" class="user">
        About!
      </a>
    `;
  }
}
