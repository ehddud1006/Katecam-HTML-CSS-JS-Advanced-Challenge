import { Component } from "../core/heropy";

export default class FruitItem extends Component{
    constructor(payload){
        // 상속받은 component가 실행되는 부분 
        super({
            tagName : 'li',
            props: payload.props
        }) 
    }
    render(){
        this.el.innerHTML = /*HTML*/`
            <span> ${this.props.name}</span>
            <span> ${this.props.price}</span>
        `
    }
}