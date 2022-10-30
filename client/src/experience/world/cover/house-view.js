import * as THREE from 'three';
import GSAP from 'gsap';
import Experience from "../../experience";
import _ from 'underscore';

export default class HouseView {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.theme = this.experience.world.theme;
    this.view = new THREE.Group();

    this.sunInital = { x: 13, y: 13, z: 1.5 };
    this.houseItemsInitial = { x: 0, y: 0, z: 1 };
    this.lerp = {
      current: { x: 0, y: 0 },
      target: { x: 0, y: 0 },
      ease: 0.1
    };

    this.mouseClickBound = this.onMouseClick.bind(this);
    this.touchBound = this.onTouch.bind(this);

    this.onMouseMove();
    this.switchDevice(this.sizes.device);
    this.setView();
  }

  setView() {
    const houseItems = ['bg', 'mount1', 'mount2', 'mount3', 'mount4', 'mount5', 'houseAndTrees', 'birds'];

    this.sun = new THREE.Mesh(
      new THREE.PlaneGeometry(4.5, 4.5),
      new THREE.MeshStandardMaterial({
        map: this.resources.items['sun' + (this.theme === 'light' ? '' : '-dark')],
        transparent: true,
        depthTest: false, // set to false to prevent the glitchy effect in alpha map while rotating
        side: THREE.DoubleSide
      })
    );
    this.sun.position.set(this.sunInital.x, this.sunInital.y, this.sunInital.z);
    this.sun.name = 'sun';
    this.view.add(this.sun);

    _.each(houseItems, (itemName, idx) => {
      this[itemName] = new THREE.Mesh(
        new THREE.PlaneGeometry(30, 30),
        new THREE.MeshStandardMaterial({
          map: this.resources.items[itemName + (this.theme === 'light' ? '' : '-dark')],
          transparent: true,
          depthTest: true, // set to false to prevent the glitchy effect in alpha map while rotating
          side: THREE.DoubleSide
        })
      );
      this[itemName].position.set(
        this.houseItemsInitial.x,
        this.houseItemsInitial.y,
        this.houseItemsInitial.z + (idx * .5)
      );
      this[itemName].name = itemName;
      this.view.add(this[itemName]);
    });

    this.scene.add(this.view);
  }

  onMouseMove() {
    let raycaster = new THREE.Raycaster();
    window.addEventListener('mousemove', e => {
      this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.moveX = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.moveY = ((e.clientY - window.innerHeight / 2) * 2) / window.innerHeight - 1.2;
      this.lerp.target = { x: this.moveX * .1, y: this.moveY * .1 };

      raycaster.setFromCamera({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: - (e.clientY / window.innerHeight) * 2 + 1
      }, this.experience.camera.orthographicCamera);
      let intersects = raycaster.intersectObjects(this.scene.children);
      let intersectSun = false;
      for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].object.name === 'sun') {
          intersectSun = true;
        }
      }
      document.body.style.cursor = intersectSun ? 'pointer' : 'default';
    });
  }

  onMouseClick(e) {
    let raycaster = new THREE.Raycaster();
    raycaster.setFromCamera({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: - (e.clientY / window.innerHeight) * 2 + 1
    }, this.experience.camera.orthographicCamera);
    let intersects = raycaster.intersectObjects(this.scene.children);
    for (let i = 0; i < intersects.length; i++) {
      if (intersects[i].object.name === 'sun') {
        this.experience.world.switchTheme(this.experience.world.theme === 'light' ? 'dark' : 'light');
      }
    }
  }

  onTouch(e) {
    let raycaster = new THREE.Raycaster();
    raycaster.setFromCamera({
      x: (e.touches[0].pageX / window.innerWidth) * 2 - 1,
      y: - (e.touches[0].pageY / window.innerHeight) * 2 + 1,
    }, this.experience.camera.orthographicCamera);
    let intersects = raycaster.intersectObjects(this.scene.children);
    for (let i = 0; i < intersects.length; i++) {
      if (intersects[i].object.name === 'sun') {
        this.experience.world.switchTheme(this.experience.world.theme === 'light' ? 'dark' : 'light');
      }
    }
  }

  switchDevice(device) {
    if (device === 'desktop') {
      this.x = -this.experience.sizes.width / 72 - 1;
      this.y = -2.25;
      this.z = 0;
      this.scale = 1;
      window.addEventListener('mousedown', this.mouseClickBound);
      window.removeEventListener('touchstart', this.touchBound);
    } else {
      this.x = -.55;
      this.y = 4.32;
      this.z = 0;
      this.scale = .6;
      window.removeEventListener('mousedown', this.mouseClickBound);
      window.addEventListener('touchstart', this.touchBound);
    }
    this.resize();
  }

  switchTheme(theme) {
    this.theme = theme;
    _.each(this.view.children, mesh => {
      mesh.material.map = this.resources.items[mesh.name + (this.theme === 'light' ? '' : '-dark')]
    });
  }

  resize() {
    this.view.position.set(this.x, this.y, this.z);
    this.view.scale.set(this.scale, this.scale);
  }

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    )
    this.sun.position.set(this.sunInital.x + this.lerp.current.x * .02, this.sunInital.y + this.lerp.current.y * .4);
    this.bg.position.set(this.houseItemsInitial.x + this.lerp.current.x * .02, this.houseItemsInitial.y + this.lerp.current.y * .4);
    this.mount1.position.set(this.houseItemsInitial.x + this.lerp.current.x * .02, this.houseItemsInitial.y + this.lerp.current.y * .8);
    this.mount2.position.set(this.houseItemsInitial.x + this.lerp.current.x * .02, this.houseItemsInitial.y + this.lerp.current.y * 1.2);
    this.mount3.position.set(this.houseItemsInitial.x + this.lerp.current.x * .02, this.houseItemsInitial.y + this.lerp.current.y * 1.6);
    this.mount4.position.set(this.houseItemsInitial.x + this.lerp.current.x * .02, this.houseItemsInitial.y + this.lerp.current.y * 1.8);
    this.mount5.position.set(this.houseItemsInitial.x + this.lerp.current.x * .02, this.houseItemsInitial.y + this.lerp.current.y * 2.2);
    this.houseAndTrees.position.set(this.houseItemsInitial.x + this.lerp.current.x * .02, this.houseItemsInitial.y + this.lerp.current.y * 2.6);
    this.birds.position.set(this.houseItemsInitial.x + this.lerp.current.x * .02, this.houseItemsInitial.y + this.lerp.current.y * 3);
    this.view.rotation.y = this.lerp.current.x * 0.5;
  }
}
