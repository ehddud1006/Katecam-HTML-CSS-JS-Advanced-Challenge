import {Component} from "../core/heropy"

export default class TheFooter extends Component {
 constructor(){
  super({
    tagName : 'footer'
  })
 } 
 render(){
  this.el.innerHTML = /*HTML */`
  <div>
    <a href="https://github.com/ParkYoungWoong/vanillajs-moive-app">
      Github Pepository
    </a>
  </div>
  <div>
    <a href="https://github.com/mun-jihye">
      ${new Date().getFullYear()}
      Munjihye
    </a>
  </div>
  `
 }
}