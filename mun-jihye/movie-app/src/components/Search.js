import { Component } from "../core/heropy";
import movieStore, {searchMovies} from'../store/movie';

export default class Search extends Component {
    render(){
        this.el.classList.add('search')
        this.el.innerHTML=/*html*/`
            <input placeholder="Enter the movie title to search!"/>
            <button class="btn btn-primary">
                Search!
            </button>
        `

        const inputEl = this.el.querySelector('input')
        inputEl.addEventListener('input',()=>{
            // 값을 입력받을 떄 갱신 
            movieStore.state.searchText = inputEl.value
        })
        inputEl.addEventListener('keydown',event =>{
            if(event.key ==='Enter' && movieStore.state.searchText.trim()){
                // 엔터 키 누르고 검색 내용이 있으면 검색 해주는 기능 
                searchMovies(1)
            }
        })

        const btnEl = this.el.querySelector('button')
        btnEl.addEventListener('click', () => {
            // 검색 버튼 누르면 검색해주는 기능 
            if(movieStore.state.searchText.trim()){
                searchMovies(1)
            }
        })
    }
}