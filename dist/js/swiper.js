export function initSwiper() {
  const swiperContainer = document.getElementById('slider-container');
  const swiper = new Swiper('.swiper-quiz', {
    cssMode: true,
    direction: 'vertical',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
    },
    mousewheel: true,
    keyboard: true,
    autoplay: {
      delay: 18000,
      disableOnInteraction: true,
    },
  });
  swiper.on('slideChange', function () {
    const progressBar = document.getElementById('progress-bar');
    if (progressBar instanceof HTMLProgressElement) {
      progressBar.value = swiper.progress * 110;
    }
  });
  swiperContainer.addEventListener('mouseout', (e) => {
    swiper.autoplay.start();
  });

  swiperContainer.addEventListener('mouseover', (e) => {
    swiper.autoplay.stop();
  });
}

export async function paginationSlider() {
  const swiperSlide = document.querySelectorAll('.swiper-slide');

  swiperSlide.forEach((slide) => {
    const pagination = slide.getAttribute('aria-label');
    if (pagination !== null) {
      slide.insertAdjacentHTML(
        'beforeend',
        `<p class="pagination">${pagination}</p>`,
      );
    }
  });
}
