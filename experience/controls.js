import * as THREE from 'three';
import GSAP from 'gsap';
import Experience from './experience';

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.camera = this.experience.camera;

    this.camera.perspectiveCamera.position.z = 35;
    // this.camera.orthographicCamera.position.x = -22.5;
  }
}
