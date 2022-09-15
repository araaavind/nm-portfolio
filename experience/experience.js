import * as THREE from 'three';

import Sizes from './utils/sizes';
import Time from './utils/time';
import Resources from './utils/resources';
import Helpers from './utils/helpers';
import assets from './utils/assets';

import Camera from './camera'
import Controls from './controls';
import Renderer from './renderer';

import World from './world/world';

export default class Experience {
  static instance;
  constructor(canvas) {
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;
    this.canvas = canvas;
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.helpers = new Helpers();
    this.controls = new Controls();
    this.renderer = new Renderer();
    this.resources = new Resources(assets);
    this.world = new World();

    this.time.on('update', () => this.update());
    this.sizes.on('resize', () => this.resize());
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.helpers.update();
    this.renderer.update();
    this.world.update();
  }
}
