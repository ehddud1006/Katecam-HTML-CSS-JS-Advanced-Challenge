import { Store } from "../core/heropy";

const store = new Store({
    searchText: '',
    page: 1,
    pageMax:1,  // 추가로 몇페이지까지 더 내용을 요청할 수 있는지 확인 
    movies: []  //영화 정보 갱신 
})

export default store
export const searchMovies = async page => {
    store.state.page = page
    if(page === 1){
        store.state.movies = []
    }
    const res = await fetch(`https://omdbapi.com?apikey=7035c60c&s=${store.state.searchText}&page=${page}`)
    const {Search, totalResults } = await res.json()
    store.state.movies = [  //누적 
        ...store.state.movies,
        ...Search
    ]
    store.state.pageMax = Math.ceil(Number(totalResults) / 10) // 올림처리 
}