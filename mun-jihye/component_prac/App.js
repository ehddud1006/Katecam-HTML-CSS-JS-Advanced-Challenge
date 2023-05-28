// export default class App {
//     constructor(){
//         this.el = document.createElement('div')
//         this.el.textContent - 'hello, world!'
//     }
// }

import { Component } from "./core/heropy";
import TheHeader from "./components/TheHeader"; 

export default class App extends Component {
    // constructor(){
    //     super({
    //         state:{  // App 에서 사용할 데이터를 정의하고 render 함수에서 사용 
    //             fruits:[
    //                 {name : 'apple', price: 1000},
    //                 {name : 'banana', price : 2000},
    //                 {name : 'cherry', price : 3000}
    //             ]
    //         }  
    //     }) // component 내부 constructor를 실행하는 부분 
    // }
    render(){  // 화면에 출력할 내부를 구현하는 부분 
        const routerView = document.createElement('router-view')
        this.el.append(
            new TheHeader().el,
            routerView
        )
    }
}