// Modals
class Modal {
  constructor(options) {
    let defaultOptions = {
      isOpen: () => {},
      isClose: () => {},
    };
    this.options = Object.assign(defaultOptions, options);
    this.modal = document.querySelector('.modal');
    this.speed = false;
    this.animation = false;
    this.isOpen = false;
    this.modalContainer = false;
    this.fixBlocks = document.querySelectorAll('.fix-block');
    this.events();
  }

  events() {
    if (this.modal) {
      document.addEventListener(
        'click',
        function (e) {
          const clickedElement = e.target.closest('[data-path]');
          if (clickedElement) {
            let target = clickedElement.dataset.path;
            let animation = clickedElement.dataset.animation;
            let speed = clickedElement.dataset.speed;
            this.animation = animation ? animation : 'fade';
            this.speed = speed ? parseInt(speed) : 220;
            this.modalContainer = document.querySelector(`[data-target=${target}]`);
            this.open();
            return;
          }

          if (e.target.closest('.modal-close')) {
            this.close();
            return;
          }
        }.bind(this),
      );
    }
  }

  open() {
    this.modal.style.setProperty('--transition-time', `${this.speed / 1000}s`);
    this.modal.classList.add('is-open');
    this.disableScroll();

    this.modalContainer.classList.add('modal-open');
    this.modalContainer.classList.add(this.animation);

    setTimeout(() => {
      this.modalContainer.classList.add('animate-open');
      this.options.isOpen(this);
      this.isOpen = true;
    }, this.speed);
  }

  close() {
    if (this.modalContainer) {
      this.modalContainer.classList.remove('animate-open');
      this.modalContainer.classList.remove(this.animation);
      this.modal.classList.remove('is-open');
      this.modalContainer.classList.remove('modal-open');

      this.enableScroll();
      this.options.isClose(this);
      this.isOpen = false;
    }
  }

  disableScroll() {
    let pagePosition = window.scrollY;
    this.lockPadding();
    document.body.classList.add('disable-scroll');
    document.body.dataset.position = pagePosition;
    document.body.style.top = -pagePosition + 'px';
  }

  enableScroll() {
    let pagePosition = parseInt(document.body.dataset.position, 10);
    this.unlockPadding();
    document.body.style.top = 'auto';
    document.body.classList.remove('disable-scroll');
    window.scroll({ top: pagePosition, left: 0 });
    document.body.removeAttribute('data-position');
  }

  lockPadding() {
    let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
    this.fixBlocks.forEach((el) => {
      el.style.paddingRight = paddingOffset;
    });
    document.body.style.paddingRight = paddingOffset;
  }

  unlockPadding() {
    this.fixBlocks.forEach((el) => {
      el.style.paddingRight = '0px';
    });
    document.body.style.paddingRight = '0px';
  }
}

const modal = new Modal({
  isOpen: (modal) => {
    console.log(modal);
    console.log('opened');
  },
  isClose: () => {
    console.log('closed');
  },
});

// Scroll
const anchors = document.querySelectorAll('a[href^="#"]');

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    // Предотвратить стандартное поведение ссылок
    // Атрибут href у ссылки, если его нет то перейти к body (наверх не плавно)
    const goto = anchor.hasAttribute('href') ? anchor.getAttribute('href') : 'body';
    // Плавная прокрутка до элемента с id = href у ссылки
    document.querySelector(goto).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
}
