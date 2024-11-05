import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();
  }

  render()
  {
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

    this.elem.addEventListener('click', (e) => {
      let index;
      if (e.target.tagName === 'SPAN') {
        document.querySelector('.slider__step-active').classList.remove('slider__step-active');
        e.target.classList.add('slider__step-active');
        const spans = this.elem.querySelectorAll('span');
        index = [...spans].indexOf(e.target) - 1; 
      } else {
        index = Math.round((this.steps - 1) * (e.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth);
      }
      this.setValue(index);
    });
  }

  setValue(index) {
    this.value = index;
    document.querySelector('.slider__value').textContent = this.value;
    let shift = this.value * 100 / (this.steps - 1);
    document.querySelector('.slider__thumb').style.left = `${shift}%`;
    document.querySelector('.slider__progress').style.width = `${shift}%`;

    let sce = new CustomEvent('slider-change', {
      detail: this.value, 
      bubbles: true 
    });

    this.elem.dispatchEvent(sce);
  }

}
