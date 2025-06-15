let scrollHeader;
const header = document.querySelector('header');
const h_logo = document.querySelector('#h_logo img');

// 콘텐츠 5 (GPT를 통한 도움)
// 초기 변수 선언
let n = 1; // 현재 페이지
const total = 9; // 전체 수
const cardWidth = 375; // 카드 너비 340px + 마진 17.5px*2 = 375px
let isMoving = false; // 중복 이동 방지
let autoSlideInterval = null; // 자동 슬라이드 정지
// 요소 선택
const tablist = document.querySelectorAll('.tab_wrap > li');
const content = document.querySelectorAll('#tab_cont .cont');
const pagi = document.querySelector('.pagi');
const p_menu = document.getElementById('p_menu');
const l_btn = document.getElementById('l_mv_btn');
const r_btn = document.getElementById('r_mv_btn');

// 헤더 관련
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

// 콘텐츠 5 (GPT를 통한 도움 및 최적화 정리)
// 초기 페이지 번호 출력
pagi.innerHTML = `${n} / ${total}`; // 예. 1/9, 2/9, ...

// 시간마다 좌측방향으로 한칸씩 이동
// 슬라이드 이동 함수
function moveSlide(wrapSelector, cardSelector, direction) {
  if (isMoving) return;
  isMoving = true;

  const wrap = document.querySelector(wrapSelector);
  const cards = wrap.querySelectorAll(cardSelector);

  if (direction === 'right') { // right, 맨 앞 카드 뒤로 이동
    wrap.style.transition = 'margin-left 0.5s';
    wrap.style.marginLeft = `-${cardWidth}px`;

    setTimeout(() => {
      wrap.appendChild(cards[0]);
      wrap.style.transition = 'none';
      wrap.style.marginLeft = '0';
      isMoving = false; // 중복 방지 처리
    }, 500);

    n = n === total ? 1 : n + 1;

  } else { // left, 맨 뒤 카드 앞으로 이동
    wrap.insertBefore(cards[cards.length - 1], cards[0]);
    wrap.style.transition = 'none';
    wrap.style.marginLeft = `-${cardWidth}px`;

    setTimeout(() => {
      wrap.style.transition = 'margin-left 0.5s';
      wrap.style.marginLeft = '0';
      setTimeout(() => isMoving = false, 500); // 중복 방지 처리
    }, 10);

    n = n === 1 ? total : n - 1;
  }

  pagi.textContent = `${n} / ${total}`; // 이동시 페이지 번호 갱신
}

// 캐러셀 초기화 (원래 순서 복원)
function resetCarousel(wrapSelector, cardSelector) {
  const wrap = document.querySelector(wrapSelector);
  const cards = Array.from(wrap.querySelectorAll(cardSelector));

  cards.sort((a, b) => a.dataset.order - b.dataset.order); // 카드 정렬 순서 원래대로 복원
  cards.forEach(card => wrap.appendChild(card));

  wrap.style.transition = 'none';
  wrap.style.marginLeft = '0';
}

// 자동 슬라이드 시작/중지
function startAutoSlide(wrapSelector, cardSelector) {
  stopAutoSlide();
  autoSlideInterval = setInterval(() => {
    moveSlide(wrapSelector, cardSelector, 'right');
  }, 3000);
}

function stopAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  }
}

// 탭 클릭 이벤트
tablist.forEach((tab, i) => {
  tab.querySelector('.t_btn').addEventListener('click', function (e) {
    e.preventDefault();

    // 탭 및 콘텐츠 전환
    tablist.forEach(t => t.classList.remove('active'));
    content.forEach(c => c.style.display = 'none');
    this.parentNode.classList.add('active');

    const activeCont = this.getAttribute('href');
    document.querySelector(activeCont).style.display = 'block';

    // 페이지 번호 및 슬라이드 초기화
    n = 1;
    pagi.textContent = `${n} / ${total}`;
    isMoving = false; // 탭 전환 시 이동상태 초기화

    // 각 탭에 따른 처리
    if (activeCont === '#p_info_con') {
      resetCarousel('.t_card_wrap', '.t_card');
      startAutoSlide('.t_card_wrap', '.t_card');
      p_menu.style.display = 'flex'; // 버튼 보이기
    } else if (activeCont === '#b_story_con') {
      resetCarousel('.t_card1_wrap', '.t_card1');
      startAutoSlide('.t_card1_wrap', '.t_card1');
      p_menu.style.display = 'flex'; // 버튼 보이기
    } else {
      stopAutoSlide();
      p_menu.style.display = 'none'; // 제품소식 탭: 버튼 숨기기
    }
  });
});

// 좌우 버튼 클릭 이벤트
// 탭1 - 좌측 이동 | 탭3 - 좌측 이동
l_btn.addEventListener('click', () => {
  if (document.querySelector('#p_info_con').style.display === 'block') {
    moveSlide('.t_card_wrap', '.t_card', 'left');
  } else if (document.querySelector('#b_story_con').style.display === 'block') {
    moveSlide('.t_card1_wrap', '.t_card1', 'left');
  }
});

// 탭1 - 우측 이동 | 탭3 - 우측 이동
r_btn.addEventListener('click', () => {
  if (document.querySelector('#p_info_con').style.display === 'block') {
    moveSlide('.t_card_wrap', '.t_card', 'right');
  } else if (document.querySelector('#b_story_con').style.display === 'block') {
    moveSlide('.t_card1_wrap', '.t_card1', 'right');
  }
});

// 초기 실행 (제품정보 탭 기준)
resetCarousel('.t_card_wrap', '.t_card');
startAutoSlide('.t_card_wrap', '.t_card');
document.querySelector('#p_info_con').style.display = 'block';

// '브랜드 이야기' 마우스 오버시 이미지 변경 (GPT 요약 도움)
for (let i = 1; i <= 9; i++) {
  const img = document.getElementById(`img${i}`);
  img.addEventListener('mouseenter', () => {
    img.src = `./images/brandStory_img${i}_over.gif`;
  });
  img.addEventListener('mouseleave', () => {
    img.src = `./images/brandStory_img${i}.gif`;
  });
}
