import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  setTitle(title) {
    this.elem.querySelector('.modal__title').textContent = title;
  }

  setBody(body) {    
    this.elem.querySelector('.modal__body').innerHTML = '';
    this.elem.querySelector('.modal__body').appendChild(body);
  }

  render() {
    let html = `<div class="modal">
      <!--Прозрачная подложка перекрывающая интерфейс-->
      <div class="modal__overlay"></div>
  
      <div class="modal__inner">
        <div class="modal__header">
          <!--Кнопка закрытия модального окна-->
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon">
          </button>
  
          <h3 class="modal__title">
            Вот сюда нужно добавлять заголовок
          </h3>
        </div>
  
        <div class="modal__body">
          A сюда нужно добавлять содержимое тела модального окна
        </div>
      </div>
    </div>`;
    
    this.elem = createElement(html);
  }

  open() {   
    document.body.appendChild(this.elem);
    document.body.classList.add('is-modal-open');   

    this.elem.querySelector('.modal__close').addEventListener('click', () => {
      this.close();
    });
        
    document.addEventListener('keydown', this.handleKeyDown);
  }

  close() {
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', this.handleKeyDown);
    this.elem.remove();
  }

  handleKeyDown(e) {
    if (e.code === 'Escape') {
      this.close();
    }
  }
}
