import { Component } from "./core/heropy";
import TheHeader from "./components/TheHeader"; 

export default class App extends Component {

    render(){  // 화면에 출력할 내부를 구현하는 부분 
        const routerView = document.createElement('router-view')
        this.el.append(
            new TheHeader().el,
            routerView
        )
    }
}