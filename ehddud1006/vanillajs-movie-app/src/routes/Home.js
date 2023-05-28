import { Component } from '../core/heropy';

export default class About extends Component {
  render() {
    this.el.innerHTML = /* html */ `
        <h1>About Page!</h1>
    `;
  }
}
