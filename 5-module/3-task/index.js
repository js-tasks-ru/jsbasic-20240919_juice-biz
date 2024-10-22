function initCarousel() {
  const arrows = document.querySelectorAll('.carousel__arrow');
  const arrowLeft = document.querySelector('.carousel__arrow_left');
  const arrowRight = document.querySelector('.carousel__arrow_right');
  const carouselInnerBox = document.querySelector('.carousel__inner');
  const carouselInnerBoxWidth = carouselInnerBox.offsetWidth;
  const qtySlides = carouselInnerBox.querySelectorAll('.carousel__slide').length;
  const maxAllowedWidth = (qtySlides - 1) * carouselInnerBoxWidth;
  let transformWidth = 0;
  hideArrows(transformWidth);
  for (let arrow of arrows) {
    arrow.addEventListener('click', () => {
      if (arrow.classList.contains('carousel__arrow_right')) {
        transformWidth -= carouselInnerBoxWidth;
      } else {
        transformWidth += carouselInnerBoxWidth;
      }
      hideArrows(transformWidth);
      carouselInnerBox.style.transform = `translateX(${transformWidth}px)`;
    });
  }

  function hideArrows(w) {
    w = Math.abs(w);
    if (w <= 0) {
      arrowLeft.style.display = 'none';
    } else {
      arrowLeft.style.display = '';
    }
    if (w >= maxAllowedWidth) {
      arrowRight.style.display = 'none';
    } else {
      arrowRight.style.display = '';
    }
  }
}
