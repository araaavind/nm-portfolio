import * as THREE from 'three';
import Experience from '../experience';
import House from './cover/house';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.resources.on('ready', () => {
      this.setLight();
      this.house = new House();
    });

  }

  setLight() {
    this.sunLight = new THREE.DirectionalLight('#ffffff', 1);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 20;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(0, 0, 100);
    this.scene.add(this.sunLight);
  }

  resize() { }

  update() {
    if (this.house) {
      this.house.update();
    }
  }
}
