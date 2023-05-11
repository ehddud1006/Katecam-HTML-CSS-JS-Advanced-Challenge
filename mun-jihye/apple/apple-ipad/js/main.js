// 장바구니
const basketStartEl = document.querySelector('header .basket-starter');
const basketEl = basketStartEl.querySelector('.basket');

basketStartEl.addEventListener('click', function(event){
    // 장바구니를 클릭했을때 window객체까지 이벤트가 전파되는 것을 멈춤
    event.stopPropagation();
    // contains : 특정한 값이 있는지 확인하는 메소드 - 있으면 True , 없으면 False
    if(basketEl.classList.contains('show')){
        // show 라는 클래스가 있으면 숨김
        hideBasket();
    }
    else{
        // show 라는 클래스가 없으면 보임
        showBasket();
    }
    
});
basketEl.addEventListener('click', function(event){
    event.stopPropagation()
})
window.addEventListener('click', function(){
    console.log('click');
    hideBasket();
});

function showBasket(){
    basketEl.classList.add('show');
}
function hideBasket(){
    basketEl.classList.remove('show');
}

// 검색
const headerEl=document.querySelector('header');
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')]
const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')
const searchShadowEl = searchWrapEl.querySelector('.shadow')
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')]

searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click', hideSearch)
searchShadowEl.addEventListener('click', hideSearch)


function showSearch(){
    headerEl.classList.add('searching')
    // document.documentElement : html 태그 의미
    document.documentElement.classList.add('fixed')
    headerMenuEls.reverse().forEach(function(el, index){
        el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
    })
    searchDelayEls.forEach(function(el,index){
        el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
    })
}
function hideSearch(){
    headerEl.classList.remove('searching')
    document.documentElement.classList.remove('fixed')
    headerMenuEls.reverse().forEach(function(el, index){
        el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
    })
    searchDelayEls.reverse().forEach(function(el,index){
        el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
    })
    searchDelayEls.reverse()
}