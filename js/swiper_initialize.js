// Initialize Swiper
var swiper = new Swiper(".s_slide", {
  spaceBetween: 0,
  centeredSlides: true,
  autoplay: {
    delay: 3000, //3초
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
