//////Component ///////////


export class Component{
    constructor(payload={}){
        const { 
            tagName = 'div',
            state= {},
            props = {}
        } = payload
        this.el = document.querySelector(tagName)  //메모리상에서 하나 정의 
        this.state = state
        this.props = props
        this.render() //Component 동작할 때 constructor 내부에서 최조 실행
    }
    render(){ // Component를 확장할 때 작성해서 사용 
        // ...
    }
}

//// Router //////////
function routeRender(routes){
    if(!location.hash){ // 해쉬 정보가 없으면
        history.replaceState(null, '', '/#/')  // 기록을 남기지 않으면서 주소 이동 
    }
    const routerView = document.querySelector('router-view')
    // http://locahost:1234/#/about?name=heropy
    // hash 정보를 얻어낼 수 있음 
    // 쿼리스트링 (?로 시작하는 부분)까지 가져옴
    // #/about?name=heropy 에서 ?이전만 필요함
    const [ hash, queryString=''] = location.hash.split('?')

    //a=123&b=456
    //['a=123','b=456']
    // query = {a: '123', b: '456'}
    const query = queryString
    .split('&')
    .reduce((acc, cur) => {
        const[key, value] = cur.split('=')
        acc[key] = value
        return acc
    },{})
    history.replaceState(query,'')

    const currentRoute = routes.find(route => new RegExp(`${route.path}/?$`).test(hash))
    routerView.innerHTML=''
    routerView.append(new currentRoute.component().el)

    window.scrollTo(0,0)
}

export function createRouter(routes){
    return function(){
        // 주소가 바뀌게 되면
        window.addEventListener('popstate', ()=>{
            routeRender(routes)
        })
        // 최초 호출 
        routeRender(routes)
    }
}

//// Store /////////
export class Store{
    constructor(state){
        this.state = {}
        this.observers = {}
        for (const key in state) {
            Object.defineProperties(this.state, key, {
                get: ()=> state[key],  //state['message']
                set: val=>{
                    state[key] = val
                    // this.observers['message]()
                    this.observers[key].forEach(observer => observer())
                }
            })
        }
    }
    subscribe(key, cb) {
        // this.observers['message'] =()=>{}
        // { message: ()=>{}}
        // { message: [()=>{}, ()=>{},,] }
        Array.isArray(this.observers[key])
        ? this.observers[key].push(cb)
        : this.observers[key] = [cb]
    }
}