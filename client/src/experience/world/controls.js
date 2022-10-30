import _ from 'underscore';
import * as THREE from 'three';
import GSAP from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Experience from '../experience';

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.theme = this.experience.world.theme;
    GSAP.registerPlugin(ScrollTrigger);

    this.particles = this.experience.world.particles;
    this.houseView = this.experience.world.houseView;

    this.switchDevice(this.sizes.device);
  }

  setScrollSnaps() {
    this.scrollSnapTrigger = ScrollTrigger.create({
      id: 'scroll-snap',
      snap: {
        snapTo: [0, .035, .08, .245, .52, .73, .98, 1],
        directional: false,
        duration: { min: .2, max: 1.2 },
        ease: 'Power1.easeInOut',
        delay: 0.05
      }
    });
  }

  setHomeScreenAnimations(triggerConfig, showMarkers = false) {
    const menuTl = new GSAP.timeline({ defaults: { ease: 'Power2.inOut', duration: .5 } });
    menuTl
      .to('.menu-item', {
        y: 0,
        opacity: 1,
        stagger: 0.15
      })
      .to('.logo', {
        x: 0,
        opacity: 1
      }, '<')
      .to('.title', {
        y: 0,
        opacity: 1,
        stagger: .2
      }, '<');
    this.homeScreenTrigger = ScrollTrigger.create({
      id: 'home-screen',
      animation: menuTl,
      trigger: triggerConfig.trigger,
      start: triggerConfig.start,
      end: triggerConfig.end,
      markers: showMarkers,
      toggleActions: 'play complete restart none'
    });
  }

  setParticleLineAnimations(triggerConfig, showMarkers = false) {
    const particleTl = new GSAP.timeline();
    particleTl
      .to(this.particles.particleMesh.geometry.attributes.position.array, {
        endArray: () => calculateVertices(this.particles),
        ease: 'Power1.easeInOut',
        duration: 1.35,
        onUpdate: () => {
          this.particles.particleMesh.geometry.attributes.position.needsUpdate = true;
        },
      })
      .to(this.particles.particleMesh.material.color, {
        id: 'particle-line-color',
        r: this.theme === 'light' ? .42 : 1,
        g: this.theme === 'light' ? .42 : 1,
        b: this.theme === 'light' ? .42 : 1,
        ease: 'Power1.easeInOut'
      }, '<');
    ScrollTrigger.create({
      id: 'particle-line',
      animation: particleTl,
      trigger: triggerConfig.trigger,
      start: triggerConfig.start,
      end: triggerConfig.end,
      toggleActions: 'play none reverse none',
      // scrub: 3,
      invalidateOnRefresh: true,
      markers: showMarkers,
      onEnter: () => {
        document.querySelector('.navbar').classList.add('sticky');
      },
      onEnterBack: () => {
        document.querySelector('.navbar').classList.remove('sticky');
      }
    });
  }

  setParticleGridScroll() {
    const top = document.body.getBoundingClientRect().top;
    this.particles.particleMesh.position.y = this.particles.y + -top * .075;
    if (window.scrollY > 20) {
      document.querySelector('.navbar').classList.add('sticky');
    } else {
      document.querySelector('.navbar').classList.remove('sticky');
    }
  }

  setObjectScroll() {
    const top = document.body.getBoundingClientRect().top;
    this.houseView.view.position.y = this.houseView.y + -top * .075;
    // this.houseView.view.rotation.x = -top * .005;
    // this.houseView.view.getObjectByName('bg').position.y = -top * .04;
    // this.houseView.view.getObjectByName('mount1').position.y = -top * .042;
    // this.houseView.view.getObjectByName('mount2').position.y = -top * .044;
    // this.houseView.view.getObjectByName('mount3').position.y = -top * .046;
    // this.houseView.view.getObjectByName('mount4').position.y = -top * .048;
    // this.houseView.view.getObjectByName('mount5').position.y = -top * .05;
    // this.houseView.view.getObjectByName('houseAndTrees').position.y = -top * .052;
    // this.houseView.view.getObjectByName('birds').position.y = -top * .054;

    // this.houseView.view.getObjectByName('bg').scale.y = 1 + top * .00055;
    // this.houseView.view.getObjectByName('bg').scale.x = 1 + top * .00055;
    // this.houseView.view.getObjectByName('mount1').scale.y = 1 + top * .0006;
    // this.houseView.view.getObjectByName('mount1').scale.y = 1 + top * .0006;
    // this.houseView.view.getObjectByName('mount2').scale.y = 1 + top * .000056;
    // this.houseView.view.getObjectByName('mount3').scale.y = 1 + top * .000054;
    // this.houseView.view.getObjectByName('mount4').scale.y = 1 + top * .000052;

    // this.houseView.view.getObjectByName('bg').scale.set(1 + top * .0013, 1 + top * .0013);
    // this.houseView.view.getObjectByName('mount1').scale.set(1 + top * .00115, 1 + top * .00115);
    // this.houseView.view.getObjectByName('mount2').scale.set(1 + top * .001, 1 + top * .001);
    // this.houseView.view.getObjectByName('mount3').scale.set(1 + top * .00085, 1 + top * .00085);
    // this.houseView.view.getObjectByName('mount4').scale.set(1 + top * .0007, 1 + top * .0007);
    // this.houseView.view.getObjectByName('mount5').scale.set(1 + top * .00055, 1 + top * .00055);
    // this.houseView.view.getObjectByName('houseAndTrees').scale.set(1 + top * .0004, 1 + top * .0004);
    // this.houseView.view.getObjectByName('birds').scale.y = 1 + top * .000046;

    // this.
  }

  switchDevice(device) {
    ScrollTrigger.killAll();
    if (device === 'desktop') {
      this.setScrollSnaps();
      this.setHomeScreenAnimations({
        trigger: '.navbar',
        start: 'top bottom',
        end: 'center top'
      }, false);
      this.setParticleLineAnimations({
        trigger: '.navbar',
        start: 'center top',
        end: 'center top'
      }, false);
      document.body.onscroll = () => {
        this.setObjectScroll();
      };
    } else {
      this.setHomeScreenAnimations({
        trigger: undefined,
        start: 'top bottom',
        end: '+=10px top'
      }, false);
      this.setParticleLineAnimations({
        trigger: undefined,
        start: 'top top',
        end: '+=10px'
      }, false);
      document.body.onscroll = () => {
        this.setObjectScroll();
        // this.setParticleGridScroll();
      };
    }
  }

  switchTheme(theme) {
    this.theme = theme;
    let particleST = ScrollTrigger.getById('particle-line');
    let lineColor = this.theme === 'light' ? { r: .42, g: .42, b: .42 } : { r: 1, g: 1, b: 1 }
    Object.assign(particleST.animation.getById('particle-line-color').vars, lineColor);
    particleST.animation.getById('particle-line-color').invalidate();
  }

  resize() { }

  update() { }
}

function calculateVertices(particles) {
  let vertices = [];
  let widthFactor = particles.lineY < 45 ? 2 : 1;
  for (let i = 0; i < particles.nx * particles.ny * 3; i++) {
    if (i % 3 == 0) {
      vertices.push([(i / 3) * (particles.w / widthFactor) - 50]);
    } else if (i % 3 == 1) {
      vertices[~~(i / 3)].push(particles.lineY);
    } else {
      vertices[~~(i / 3)].push(6);
    }
  }
  return new Float32Array(_.flatten(_.shuffle(vertices)));
}
