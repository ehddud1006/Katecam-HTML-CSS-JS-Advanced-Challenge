//////Component ///////////


export class Component{
    constructor(payload={}){
        const { 
            tagName = 'div',
            state= {}
        } = payload
        this.el = document.querySelector(tagName)  //메모리상에서 하나 정의 
        this.state = state
        this.render() //Component 동작할 때 constructor 내부에서 최조 실행
    }
    render(){ // Component를 확장할 때 작성해서 사용 
        // ...
    }
}