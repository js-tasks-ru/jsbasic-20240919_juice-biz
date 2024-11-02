import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    let html = `<div class="slider">
                  <div class="slider__thumb">
                    <span class="slider__value">${this.value}</span>
                  </div>
                  <div class="slider__progress"></div>
                  <div class="slider__steps">`;

    for (let step = 0; step < this.steps; step++) {
      let activeClass = step === this.value ? ' class="slider__step-active"' : '';
      html += `<span${activeClass}></span>`;
    }      
    
    html += `</div>
            </div>`;    

    this.elem = createElement(html);
    this.setValue(value, 100 * value / (steps - 1));
    this.click();
    this.dragAndDrop();
  }

  click()
  {
    let index;

    this.elem.addEventListener('click', (e) => {
      if (e.target.tagName === 'SPAN') {        
        const spans = this.elem.querySelectorAll('span');
        index = [...spans].indexOf(e.target) - 1; 
      } else {
        index = Math.round((this.steps - 1) * (e.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth);
      }
      
      let shift = index * 100 / (this.steps - 1);
      this.setValue(index, shift);
      this.createEvent(index);
    });
  }

  setValue(index, shift) {
    this.value = index;
    
    this.elem.querySelector('.slider__value').textContent = index;
    this.elem.querySelector('.slider__thumb').style.left = `${shift}%`;
    this.elem.querySelector('.slider__progress').style.width = `${shift}%`;

    this.elem.querySelector('.slider__step-active').classList.remove('slider__step-active');
    let spans = this.elem.querySelectorAll('span');
    spans[index + 1].classList.add('slider__step-active');    
  }

  dragAndDrop() {
    let slider = this.elem;
    let thumb = this.elem.querySelector('.slider__thumb');
    let steps = this.steps;
    let thisSlider = this;
    thumb.ondragstart = () => false;

    thumb.addEventListener('pointerdown', (e) => {
      e.preventDefault(); 

      let shiftX = e.clientX - thumb.getBoundingClientRect().left;
      let index;

      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);

      function onPointerMove(e) {
        slider.classList.add('slider_dragging');
        let newLeft = e.clientX - shiftX - slider.getBoundingClientRect().left;

        if (newLeft < 0) {
          newLeft = 0;
        }
        let rightEdge = slider.offsetWidth;
        if (newLeft > rightEdge) {
          newLeft = rightEdge;
        }

        thumb.style.left = newLeft + 'px';
        
        index = Math.round((steps - 1) * (newLeft / slider.offsetWidth));
        let shift = 100 * newLeft / slider.offsetWidth;
        thisSlider.setValue(index, shift);
      }

      function onPointerUp() {
        document.removeEventListener('pointerup', onPointerUp);
        document.removeEventListener('pointermove', onPointerMove);
        slider.classList.remove('slider_dragging');
        thisSlider.createEvent(index);
      }

    });
  }

  createEvent(index) {
    let sce = new CustomEvent('slider-change', {
      detail: index, 
      bubbles: true 
    });
    this.elem.dispatchEvent(sce);
  }
}
