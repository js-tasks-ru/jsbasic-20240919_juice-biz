import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.render();
    this.initCarousel();
  }

  render() {
    let html = `<div class="carousel">
                  <div class="carousel__arrow carousel__arrow_right">
                    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
                  </div>
                  <div class="carousel__arrow carousel__arrow_left">
                    <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
                  </div>
                  <div class="carousel__inner">`;

    for (let product of this.slides) {
      product.price = '€' + (+product.price).toFixed(2);
      html += `<div class="carousel__slide" data-id="${product.id}">
                  <img src="/assets/images/carousel/${product.image}" class="carousel__img" alt="slide">
                  <div class="carousel__caption">
                    <span class="carousel__price">${product.price}</span>
                    <div class="carousel__title">${product.name}</div>
                    <button type="button" class="carousel__button">
                      <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                    </button>
                  </div>
                </div>`;
    }

    html += '</div></div>';
    this.elem = createElement(html);

    const carouselBtns = this.elem.querySelectorAll('.carousel__button');
    for (let carouselBtn of carouselBtns) {
      carouselBtn.addEventListener('click', () => {
        let pe = new CustomEvent('product-add', {
          bubbles: true,
          detail: carouselBtn.closest('.carousel__slide').dataset.id,
        });  
        this.elem.dispatchEvent(pe);
      });
    }
  }

  initCarousel() {
    const arrows = this.elem.querySelectorAll('.carousel__arrow');
    const arrowLeft = this.elem.querySelector('.carousel__arrow_left');
    const arrowRight = this.elem.querySelector('.carousel__arrow_right');
    let transformWidth = 0;
    let maxAllowedWidth = null;
    let qtySlides = this.slides.length;
    hideArrows(transformWidth);

    for (let arrow of arrows) {
      arrow.addEventListener('click', () => {
        const carouselInnerBox = this.elem.querySelector('.carousel__inner');
        const carouselInnerBoxWidth = this.elem.offsetWidth;
        maxAllowedWidth = (qtySlides - 1) * carouselInnerBoxWidth;
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
      if ((w == 0 && qtySlides < 2) || (maxAllowedWidth && w >= maxAllowedWidth)) {
        arrowRight.style.display = 'none';
      } else {
        arrowRight.style.display = '';
      }
    }
  }
  
}
