import * as THREE from 'three';
import Experience from '../../experience';

export default class Particles {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.world = this.experience.world;
    this.resources = this.experience.resources;
    this.theme = this.experience.world.theme;

    this.nx = 59;
    this.ny = 34;
    this.w = .613556;
    this.h = 1.06470;
    this.particleGeometry = new THREE.BufferGeometry();
    this.particleMesh = new THREE.Points();
    this.vertices = new Float32Array(this.nx * this.ny * 3);

    this.switchDevice(this.sizes.device);
    this.setParticles();
  }

  setParticles() {
    // Form a grid
    for (let i = 0; i < this.nx; i++) {
      for (let j = 0; j < this.ny; j++) {
        this.vertices[(((i * this.ny) + j) * 3)] = i * this.w;
        this.vertices[(((i * this.ny) + j) * 3) + 1] = j * this.h;
        this.vertices[(((i * this.ny) + j) * 3) + 2] = 0;
      }
    }
    this.particleGeometry.setAttribute('position', new THREE.BufferAttribute(this.vertices, 3));
    this.particleMesh.geometry = this.particleGeometry;
    this.particleMesh.material = new THREE.PointsMaterial({
      // color: this.theme === 'light' ? '#cccccc' : '#ffffff',
      size: this.dotSize,
      map: this.resources.items['dot' + (this.theme === 'light' ? '' : '-dark')],
      transparent: true,
      alphaTest: .5
    });
    this.scene.add(this.particleMesh);
  }

  switchDevice(device) {
    if (device === 'desktop') {
      this.scale = 1;
      this.x = -(((this.nx * this.w) - this.w) / 2) * this.scale - (this.sizes.width / 72);
      this.y = -(((this.ny * this.h) - this.h) / 2) * this.scale - 1.25;
      this.z = 0;
      this.dotSize = 6;
      /*
        The adjustment made for responsive navbar in phones and tablets.
        => 0.096 = navbar height in fraction of window height(0.06) + navbar padding in fraction of window height(0.018 + 0.018).
        Normalised values of orthographic camera view are unprojected to get the coordinates in 3D space.
        this.y is subtracted for adjusting the mesh y position to each point.
        .1 is subtracted for better visibility.
      */
      this.lineY = new THREE.Vector3(0, (1 - (2 * 0.096)), -1).unproject(this.experience.camera.orthographicCamera).y - this.y - .1;
    } else {
      this.scale = .65;
      this.x = -(((this.nx * this.w) - this.w) / 2) * this.scale;
      this.y = -(((this.ny * this.h) - this.h) / 2) * this.scale + (this.sizes.height / 172);
      this.z = 0;
      this.dotSize = 5;
      /*
        The adjustment made for responsive navbar in phones and tablets.
        => 0.096 = navbar height in fraction of window height(0.06) + navbar padding in fraction of window height(0.018 + 0.018).
        Normalised values of orthographic camera view are unprojected to get the coordinates in 3D space.
        this.y is subtracted for adjusting the mesh y position to each point.
        scale factor of .65 has been adjusted for mobile devices.
        .1 is subtracted for better visibility.
      */
      this.lineY = (new THREE.Vector3(0, (1 - (2 * 0.096)), -1).unproject(this.experience.camera.orthographicCamera).y - this.y) * (1 / .65) - .1;
    }
    this.resize();
  }

  switchTheme(theme) {
    this.theme = theme;
    this.particleMesh.material.map = this.resources.items['dot' + (this.theme === 'light' ? '' : '-dark')]
  }

  resize() {
    this.particleMesh.position.set(this.x, this.y, this.z);
    this.particleMesh.scale.set(this.scale, this.scale);
  }

  update() { }
}
