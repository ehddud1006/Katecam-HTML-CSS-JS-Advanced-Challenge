import { Component } from "../core/heropy";

// props - 부모 컴포넌트에서 자식 컴포넌트로 데이터를 내릴 때 사용 
export default class MovieItem extends Component{
    constructor(props){  // props객체데이터로 영화정보를 받아옴 
        super({
            props,
            tagName: 'a'
        })
    }
    render(){
        const { movie } = this.props

        //href 속성 설정
        this.el.setAttribute('href', `#/movie?id=${movie.imdbID}`)
        this.el.classList.add('movie')
        this.el.style.backgroundImage = `url(${movie.Poster})`
        this.el.innerHTML= /*html */`
            <div class="info">
                <div class ="year">
                    ${movie.Year}
                </div>
                <div class = "title">
                    ${movie.Title}
                </div>
            </div>
        ` 
    }
}