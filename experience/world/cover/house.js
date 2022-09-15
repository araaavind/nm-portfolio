import * as THREE from 'three';
import GSAP from 'gsap';
import Experience from "../../experience";

export default class House {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;
    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1
    };

    this.setHouse();
    this.onMouseMove();

    this.sizes.on('switchdevice', (device) => {
      if (device === 'desktop') {

      }
    })
  }

  setHouse() {
    this.dotsTexture = this.resources.items.dots;
    this.dotsTextureAlpha = this.resources.items.dotsAlpha;
    this.sunTexture = this.resources.items.sun;
    this.sunTextureAlpha = this.resources.items.sunAlpha;
    this.houseTexture = this.resources.items.house;
    this.houseTextureAlpha = this.resources.items.houseAlpha;

    this.dotsGrid = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 40),
      new THREE.MeshStandardMaterial({
        map: this.dotsTexture,
        alphaMap: this.dotsTextureAlpha,
        transparent: true,
        depthTest: false, // to prevent the glitchy effect in alpha map while rotating
        side: THREE.DoubleSide
      })
    );
    this.scene.add(this.dotsGrid);
    this.dotsGrid.position.set(-22.5, 0, 0);

    this.sun = new THREE.Mesh(
      new THREE.PlaneGeometry(5, 5),
      new THREE.MeshStandardMaterial({
        map: this.sunTexture,
        alphaMap: this.sunTextureAlpha,
        transparent: true,
        depthTest: false, // to prevent the glitchy effect in alpha map while rotating
        side: THREE.DoubleSide
      })
    );
    this.scene.add(this.sun);
    this.sun.position.set(-10, 12.5, 1);

    this.house = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshStandardMaterial({
        map: this.houseTexture,
        alphaMap: this.houseTextureAlpha,
        transparent: true,
        depthTest: false, // to prevent the glitchy effect in alpha map while rotating
        side: THREE.DoubleSide
      })
    );
    this.scene.add(this.house);
    this.house.position.set(-22.5, 0);
    this.house.scale.set(2.9, 2.9);
  }

  onMouseMove() {
    window.addEventListener('mousemove', e => {
      this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.05;
    });
  }

  resize() { }

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    )
    this.house.rotation.y = this.lerp.current;
  }
}
