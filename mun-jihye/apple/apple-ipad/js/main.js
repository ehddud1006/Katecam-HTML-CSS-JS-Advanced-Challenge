import ipads from "../data/ipads.js"
import navigations from "../data/navigations.js"

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
const searchInputEl = searchWrapEl.querySelector('input')
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')]

searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click', function(event){
    event.stopPropagation()
    hideSearch()
})
searchShadowEl.addEventListener('click', hideSearch)


function showSearch(){
    headerEl.classList.add('searching')
    // document.documentElement : html 태그 의미
    stopScroll()
    headerMenuEls.reverse().forEach(function(el, index){
        el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
    })
    searchDelayEls.forEach(function(el,index){
        el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
    })
    setTimeout(function(){
        searchInputEl.focus()
    }, 600)
}
function hideSearch(){
    headerEl.classList.remove('searching')
    playScroll()
    headerMenuEls.reverse().forEach(function(el, index){
        el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
    })
    searchDelayEls.reverse().forEach(function(el,index){
        el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
    })
    searchDelayEls.reverse()
    // 검색바가 사라질 떄 이전 내용 초기화
    searchInputEl.value = ''
}

function playScroll(){
    document.documentElement.classList.remove('fixed')
}
function stopScroll(){
    document.documentElement.classList.add('fixed')  // 화면이 더이상 스크롤되지 않음
}

// 헤더 메뉴 토글
const menuStarterEl = document.querySelector('header .menu-starter')
menuStarterEl.addEventListener('click', function(){
    if (headerEl.classList.contains('menuing')){
        headerEl.classList.remove('menuing')
        searchInputEl.value = ''
        playScroll()
    } else{
        headerEl.classList.add('menuing') // 버튼의 클릭상태를 확인할 수 있음 
        stopScroll()
    }
    
})

// 헤더 검색 
const searchTextFieldEl = document.querySelector('header .textfield')
const searchCancelEl = document.querySelector('header .search-canceler')
searchTextFieldEl.addEventListener('click',function(){
    headerEl.classList.add('searching--mobile')
    searchInputEl.focus()
})
searchCancelEl.addEventListener('click',function(){
    headerEl.classList.remove('searching--mobile')
})


//화면의 크기가 바뀔때마다 콜백함수를 실행 
window.addEventListener('resize', function(){
    if(window.innerWidth <= 740){ //모바일모드 
        headerEl.classList.remove('searching')
    }else{  //테블릿모드, 데스크탑모드 
        headerEl.classList.remove('searching--mobile')
    }
})

//
const navEl = document.querySelector('nav')
const navMenuToggleEl = navEl.querySelector('.menu-toggler')
const navMenuShadowEl = navEl.querySelector('.shadow')

navMenuToggleEl.addEventListener('click', function(){
    if(navEl.classList.contains('menuing')){
        hideNavMenu()
    }else{
        showNavMenu()
    }
})
navEl.addEventListener('click', function(event){
    event.stopPropagation()
})
navMenuShadowEl.addEventListener('click', hideNavMenu)
window.addEventListener('click', hideNavMenu)

function showNavMenu(){
    navEl.classList.add('menuing')
}
function hideNavMenu(){
    navEl.classList.remove('menuing')
}

// 요소의 가시성 관찰
const io = new IntersectionObserver(function (entries){
    entries.forEach(function(entry){
        if(!entry.isIntersecting){
            return
        }
        entry.target.classList.add('show')
    })
})
const infoEls = document.querySelectorAll('.info')
infoEls.forEach(function(el){
    io.observe(el)
})


//비디오 재생 !
const video = document.querySelector('.stage video')
const playBtn = document.querySelector('.stage .controller--play')
const pauseBtn = document.querySelector('.stage .controller--pause')

playBtn.addEventListener('click', function(){
    video.play()
    playBtn.classList.add('hide')
    pauseBtn.classList.remove('hide')
})
pauseBtn.addEventListener('click', function(){
    video.pause()
    playBtn.classList.remove('hide')
    pauseBtn.classList.add('hide')
})

// '당신에게 맞는 iPad는? 랜더링!
const itemEls = document.querySelector('section.compare .items')
ipads.forEach(function(ipad){
    // 요소를 자바스크립트로 생성하는 
    const itemEl = document.createElement('div')
    itemEl.classList.add('item')
    
    let colorList = ''
    ipad.colors.forEach(function(color){
        colorList += /*html*/`
            <li style='background-color:${color};'></li>
        `
    })

    itemEl.innerHTML = /*html*/ `
        <div class="thumbnail">
            <img src="${ipad.thumbnail}" alt="${ipad.name}"/>
        </div>
        <ul class="colors">
            ${colorList}
        </ul>
        <h3 class="name">${ipad.name}</h3>
        <p class="tagline">${ipad.tagline}</p>
        <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
        <button class="btn">구입하기</button>
        <a href="${ipad.url}" class="link">더 알아보기</a>
    `

    itemEls.append(itemEl)
})

// Navigations
const navigationsEl = document.querySelector('footer .navigations')
navigations.forEach(function(nav){
    const mapEl = document.createElement('div')
    mapEl.classList.add('map')

    let mapList = ''
    nav.maps.forEach(function(map){
        mapList += /*html*/  `
        <li>
            <a href="${map.url}">${map.name}</a>
        </li>
        `
    })

    mapEl.innerHTML = /*html*/ `
    
    <h3>
        <span class='text'>${nav.title}</span>
    </h3>
    <ul>
        ${mapList}
    </ul>

    `
    navigationsEl.append(mapEl)
})

// 현재 년도 출력
const thisYearEl = document.querySelector('span.this-year')
thisYearEl.textContent = new Data().getFullYear()

