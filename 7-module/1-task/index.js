import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
    this.initRibbon();
  }

  render() {
    let html = `<div class="ribbon">
                  <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
                    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
                  </button>
                  <nav class="ribbon__inner">`;
    for (let category of this.categories) {
      html += `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`;
    }
    html += `</nav>
            <button class="ribbon__arrow ribbon__arrow_right">
              <img src="/assets/images/icons/angle-icon.svg" alt="icon">
            </button>
          </div>`;
    this.elem = createElement(html);

    
  }

  initRibbon() {
    const ribbonArrows = this.elem.querySelectorAll('.ribbon__arrow');
    const ribbonArrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    const ribbonArrowRight = this.elem.querySelector('.ribbon__arrow_right');
    const ribbonInner = this.elem.querySelector('.ribbon__inner');    
    const ribbonItems = this.elem.querySelectorAll('.ribbon__item');

    ribbonArrowLeft.classList.remove('ribbon__arrow_visible');
    ribbonArrowRight.classList.add('ribbon__arrow_visible');
    
    for (let ribbonArrow of ribbonArrows) {
      ribbonArrow.addEventListener('click', () => {
        let shift = ribbonArrow.classList.contains('ribbon__arrow_left') ? -350 : 350;
        ribbonInner.scrollBy(shift, 0);
      });
    }
      
    ribbonInner.addEventListener('scrollend', () => {
      showArrows();
    });

    for (let ribbonItem of ribbonItems) {
      ribbonItem.addEventListener('click', (e) => {
        e.preventDefault();
        if (document.querySelector('.ribbon__item_active')) {
          document.querySelector('.ribbon__item_active').classList.remove('ribbon__item_active');
        }
        e.target.classList.add('ribbon__item_active');
        let rse = new CustomEvent('ribbon-select', { 
          detail: e.target.dataset.id, 
          bubbles: true 
        });
        this.elem.dispatchEvent(rse);
      });
    }

    function showArrows() {
      ribbonArrowRight.classList.add('ribbon__arrow_visible');
      ribbonArrowLeft.classList.add('ribbon__arrow_visible');
      let scrollWidth = ribbonInner.scrollWidth;
      let scrollLeft = ribbonInner.scrollLeft;
      let clientWidth = ribbonInner.clientWidth;

      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft === 0) {
        ribbonArrowLeft.classList.remove('ribbon__arrow_visible');
      } 
      if (scrollRight < 1) {
        ribbonArrowRight.classList.remove('ribbon__arrow_visible');
      }
    }
  }
}
