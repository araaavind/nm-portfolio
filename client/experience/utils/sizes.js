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

      if ((Math.abs(this.height - lastHeight) > 140) || Math.abs(this.width - lastWidth) > 50) { // To prevent full screen resize on mobile browsers
        this.emit('resize');
      }
      lastHeight = this.height;
      lastWidth = this.width;
    });
  }
}
