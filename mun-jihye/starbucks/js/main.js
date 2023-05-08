const searchEL =document.querySelector('.search');
const searchInputEL = searchEL.querySelector('input');

searchEL.addEventListener('click', function(){
    searchInputEL.focus();
});

searchInputEL.addEventListener('focus', function(){
    searchEL.classList.add('focused'); //focused 라는 클래스를 추가하겠다
    searchInputEL.setAttribute('placeholder','통합검색'); //searchInputEL에 속성 placehold(첫번째 요소-속성이름)인 통합검색(두번째 요소- 속성 값)을 지정한다
});

searchInputEL.addEventListener('blur', function(){
    searchEL.classList.remove('focused'); //focused 라는 클래스를 추가하겠다
    searchInputEL.setAttribute('placeholder',''); //searchInputEL에 속성 placehold(첫번째 요소-속성이름)인 통합검색(두번째 요소- 속성 값)을 지정한다
});

const badgeEL = document.querySelector('header .badges');
const toTopEL = document.querySelector('#to-top');

// window 객체 ==> 프로젝트가 출력되고 있는 화면 자체
window.addEventListener('scroll', _.throttle(function(){
    if (window.scrollY >500){
        //배지 숨기기
        // gsap.to(요소, 지속시간, 옵션); - 애니메이션
        gsap.to(badgeEL, 0.6, {
            opacity: 0,
            display:'none'
        });
        // 버튼 보이기
        gsap.to(toTopEL, .2, {
            x: 0
        });
    } else{
        //배지 보이기
        gsap.to(badgeEL, 0.6, {
            opacity: 1,
            display:'block'
        });
        //버튼 숨기기
        gsap.to(toTopEL, .2, {
            x: 100
        });
    }
}, 300));
//_.throttle(함수, 시간)

toTopEL.addEventListener('click', function(){
    gsap.to(window, .7, {
        scrollTo: 0
    })
});

const fadeELs = document.querySelectorAll('.visual .fade-in');
fadeELs.forEach(function(fadeEL, index) {
    // gsap.to(요소, 지속시간, 옵션); - 애니메이션
    gsap.to(fadeEL, 1, {
        delay: (index+1) * .7,
        opacity: 1,
    });
});

new Swiper('.notice-line .swiper-container', {
    direction:'vertical',
    autoplay: true,
    loop: true
});

new Swiper('.promotion .swiper-container', {
    autoplay: { // 자동 재생 여부
        delay: 5000 // 5초마다 슬라이드 바뀜
      },
    loop: true, // 반복 재생 여부
    slidesPerView: 3, // 한 번에 보여줄 슬라이드 개수
    spaceBetween: 10, // 슬라이드 사이 여백
    centeredSlides: true, // 1번 슬라이드가 가운데 보이기
    pagination: {
        el: '.promotion .swiper-pagination', //페이지 번호 요소 선택자 
        clickable : true, // 사용자의 페이지 번호 요소 제어 가능 여부
    },
    navigation:{// 슬라이드 이전/다음 버튼 사용 여부
        prevEL:'.promotion .swiper-prev',
        nextEL:'.promotion .swiper-next',
    }
});

new Swiper('.awards .swiper-container',{
    autoplay: true,
    loop: true,
    spaceBetween: 30,
    slidesPerView: 5,
    navigation:{
        prevEL:'.awards .swiper-prev',
        nextEL:'.awards .swiper-next',
    }
});

const promotionEL = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false; // 보이는 상태 
promotionToggleBtn.addEventListener('click', function(){
    isHidePromotion = !isHidePromotion
    if(isHidePromotion){
        // 숨김처리!
        promotionEL.classList.add('hide');
    }else{
        // 보임처리! 
        promotionEL.classList.remove('hide');
    }
})

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
    // `.toFixed()`를 통해 반환된 문자 데이터를,
    // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
    return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size){
    // gasp.to(요소, 시간, 옵션);
    gsap.to(selector, 
        random(1.5, 2.5), 
        { //옵션
            y: size, //y축으로 얼마만큼 이동
            repeat: -1, // 무한 반복
            yoyo: true, //한번 재생된 애니메이션을 다시 뒤로 재생
            ease: Power1.easeInOut, // 활성화 함수 
            delay: random(0, delay),

        }
    );
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);


const spyELs= document.querySelectorAll('section.scroll-spy');
spyELs.forEach(function(spyEL){
    new ScrollMagic
        .Scene({
            triggerElement: spyEL, // 보여짐 여부를 감시할 요소를 지정 
            triggerHook: .8
        })
        .setClassToggle(spyEL, 'show')
        .addTo(new ScrollMagic.Controller());
});

const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); 