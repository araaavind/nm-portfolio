import { EventEmitter } from 'events';

export default class Sizes extends EventEmitter {
  constructor() {
    super();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.aspect = this.width / this.height;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.frustrum = 50;
    this.device = this.width < 968 ? 'mobile' : 'desktop';
    handleNavbarResponsiveness(this.height);

    let lastHeight = window.innerHeight;
    let lastWidth = window.innerWidth;
    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.aspect = this.width / this.height;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);

      if (this.width < 968 && this.device !== 'mobile') {
        this.device = 'mobile';
        this.emit('switchdevice', this.device);
      } else if (this.width > 968 && this.device !== 'desktop') {
        this.device = 'desktop';
        this.emit('switchdevice', this.device);
      }

      // To prevent address bar disappearing on scroll issue in mobile browsers
      if ((Math.abs(this.height - lastHeight) > 140) || Math.abs(this.width - lastWidth) > 50) {
        handleNavbarResponsiveness(this.height);
        this.emit('resize');
      }
      lastHeight = this.height;
      lastWidth = this.width;
    });
  }
}

function handleNavbarResponsiveness(height) {
  document.documentElement.style.setProperty('--navbar-max-width-height', `${height * 0.06}px`);
  document.documentElement.style.setProperty('--navbar-sticky-padding', `${height * 0.018}px 0px`);
}