import { Store } from "../core/heropy";

const store = new Store({
  searchText: '',
  page: 1,
  pageMax:1,  // 추가로 몇페이지까지 더 내용을 요청할 수 있는지 확인 
  movies: [],  //영화 정보 갱신 
  movie:[],
  loading: false,
  message: 'Search for the movie title!'
})

export default store
export const searchMovies = async page => {
  store.state.loading = true
  store.state.page = page
  if(page === 1){
      store.state.movies = []
      store.state.message = ''
  }
  try{
    const res = await fetch(`https://omdbapi.com?apikey=7035c60c&s=${store.state.searchText}&page=${page}`)
    // 서버로부터 온 데이터 
    const {Search, totalResults, Response, Error } = await res.json()
    if ( Response ==='True'){ // 정상 작동 
      store.state.movies = [  //누적 , 실제 영화정보 할당 
        ...store.state.movies,
        ...Search
      ]
      store.state.pageMax = Math.ceil(Number(totalResults) / 10) // 올림처리 
    } else {
      store.state.message = Error
    }
  } catch(error){
    console.log('searchMovies error: ', error)
  }

  store.state.loading = false
}

export const getMovieDetails = async id => {
  try{
    // i : 영화의 상세정보를 아이디로 가져오기
    const res = await fetch(`https://omdbapi.com?apikey=7035c60c&i=${id}&plot=full`)
    store.state.movie = await res.json()
  } catch(error){
    console.log('getMovieDetails error :', error)
  }
}