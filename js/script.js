let scrollHeader;
const header = document.querySelector('header');
const h_logo = document.querySelector('#h_logo img');

let n = 1;
let tablist = document.querySelectorAll('.tab_wrap > li');
let content = document.querySelectorAll('#tab_cont .cont');
let activeCont = '';

const p_menu = document.getElementById('p_menu');
const l_btn = document.getElementById('l_mv_btn');
const r_btn = document.getElementById('r_mv_btn');


// 헤더 스크롤
window.addEventListener('scroll', function() {
  scrollHeader = window.scrollY;
  // console.log(scrollHeader);

  if(scrollHeader != 0) {
    header.classList.add('act');
    h_logo.src = './images/logo_over.png';
  } else {
    header.classList.remove('act');
    h_logo.src = './images/logo.png';
  }
});

// gnb메뉴 후버 관련 서브메뉴 여닫기 (jQuery)
$(".gnb > ul").mouseenter(function() {
  $(".submenu").stop().slideDown(250);
  $(".menu_back").stop().slideDown(250);
});
$(".gnb > ul").mouseleave(function() {
  $(".submenu").stop().slideUp(400);
  $(".menu_back").stop().slideUp(400);
});

// 탭 메뉴 클릭시 출력 콘텐츠 변경
/* 출처: https://abcdqbbq.tistory.com/88 */
for(let i = 0; i < tablist.length; i++) {
  tablist[i].querySelector('.t_btn').addEventListener('click', function(e) {
    e.preventDefault();
    for(let j = 0; j < tablist.length; j++) {
      tablist[j].classList.remove('active');

      content[j].style.display = 'none';
    }

    this.parentNode.classList.add('active');

    activeCont = this.getAttribute('href');
    document.querySelector(activeCont).style.display = 'block';
  });
}

// 좌우버튼 클릭시 페이지네이션의 페이지넘버 변경
document.querySelector('.pagi').innerHTML = n + ' / 9'

l_btn.onclick = function() {
  // 탭1 - 좌측 이동
  // 탭3 - 좌측 이동
  
  // 페이지 번호 변경
  if(n == 1) {
    n = 9;
  } else {
    n = n - 1;
  }
  document.querySelector('.pagi').innerHTML = n + ' / 9';
}

r_btn.onclick = function() {
  // 우선 적용(추후 수정, 탭 활성화시만 적용되게)
  // 탭1 - 우측 이동
  $('.t_card_wrap').animate({'transform':'translateX(-340px)'},function(){
    $('.t_card').first().appendTo('.t_card_wrap');
    $('.t_card1_wrap').css({'transform':'translateX(0px)'});
  });
  // 탭3 - 우측 이동
  $('.t_card1_wrap').animate({'transform':'translateX(-340px)'},function(){
    $('.t_card1').first().appendTo('.t_card1_wrap');
    $('.t_card1_wrap').css({'transform':'translateX(0px)'});
  });
  
  // 페이지 번호 변경
  if(n == 9) {
    n = 1;
  } else {
    n = n + 1;
  }
  document.querySelector('.pagi').innerHTML = n + ' / 9';
}

// '브랜드 이야기' 마우스 오버시 이미지 변경
// 하나의 스크립트로 구현가능한 요약 필요
const card_img1 = document.getElementById('img1');
card_img1.addEventListener('mouseenter', function() {
  card_img1.src = './images/brandStory_img1_over.gif';
});
card_img1.addEventListener('mouseleave', function() {
  card_img1.src = './images/brandStory_img1.gif';
});

const card_img2 = document.getElementById('img2');
card_img2.addEventListener('mouseenter', function() {
  card_img2.src = './images/brandStory_img2_over.gif';
});
card_img2.addEventListener('mouseleave', function() {
  card_img2.src = './images/brandStory_img2.gif';
});

const card_img3 = document.getElementById('img3');
card_img3.addEventListener('mouseenter', function() {
  card_img3.src = './images/brandStory_img3_over.gif';
});
card_img3.addEventListener('mouseleave', function() {
  card_img3.src = './images/brandStory_img3.gif';
});

const card_img4 = document.getElementById('img4');
card_img4.addEventListener('mouseenter', function() {
  card_img4.src = './images/brandStory_img4_over.gif';
});
card_img4.addEventListener('mouseleave', function() {
  card_img4.src = './images/brandStory_img4.gif';
});

const card_img5 = document.getElementById('img5');
card_img5.addEventListener('mouseenter', function() {
  card_img5.src = './images/brandStory_img5_over.gif';
});
card_img5.addEventListener('mouseleave', function() {
  card_img5.src = './images/brandStory_img5.gif';
});

const card_img6 = document.getElementById('img6');
card_img6.addEventListener('mouseenter', function() {
  card_img6.src = './images/brandStory_img6_over.gif';
});
card_img6.addEventListener('mouseleave', function() {
  card_img6.src = './images/brandStory_img6.gif';
});

const card_img7 = document.getElementById('img7');
card_img7.addEventListener('mouseenter', function() {
  card_img7.src = './images/brandStory_img7_over.gif';
});
card_img7.addEventListener('mouseleave', function() {
  card_img7.src = './images/brandStory_img7.gif';
});

const card_img8 = document.getElementById('img8');
card_img8.addEventListener('mouseenter', function() {
  card_img8.src = './images/brandStory_img8_over.gif';
});
card_img8.addEventListener('mouseleave', function() {
  card_img8.src = './images/brandStory_img8.gif';
});

const card_img9 = document.getElementById('img9');
card_img9.addEventListener('mouseenter', function() {
  card_img9.src = './images/brandStory_img9_over.gif';
});
card_img9.addEventListener('mouseleave', function() {
  card_img9.src = './images/brandStory_img9.gif';
});

// 시간마다 좌측방향으로 한칸씩 이동
/* 원문 참고 출처: https://velog.io/@fairytale779/webdesign2 */
// 카드 너비 340px + 마진 17.5px*2

setInterval(function(){
  $('.t_card_wrap').animate({'transform':'translateX(-340px)'},function(){
    $('.t_card').first().appendTo('.t_card_wrap');
    $('.t_card_wrap').css({'transform':'translateX(0px)'});
  });
},3000);

setInterval(function(){
  $('.t_card1_wrap').animate({'transform':'translateX(-340px)'},function(){
    $('.t_card1').first().appendTo('.t_card1_wrap');
    $('.t_card1_wrap').css({'transform':'translateX(0px)'});
  });
},3000);

//
