import './style.css'
import * as THREE from 'three';
import Experience from './experience/experience';

const experience = new Experience(document.querySelector('.experience-canvas'));

/*
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha: true
});
const textureLoader = new THREE.TextureLoader();

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.x = -3;
camera.position.z = 30;

renderer.render(scene, camera);

// Background

scene.background = new THREE.Color(0xffffff);

// Home-page graphics

const gridTexture = textureLoader.load('dots.jpg');
const gridTextureAlpha = textureLoader.load('dotsAlpha.jpg');
const sunTexture = textureLoader.load('sun.jpg');
const sunTextureAlpha = textureLoader.load('sunAlpha.jpg');

const dotsGrid = new THREE.Mesh(
  new THREE.PlaneGeometry(40, 40),
  new THREE.MeshBasicMaterial({
    map: gridTexture,
    alphaMap: gridTextureAlpha,
    transparent: true
  })
);
scene.add(dotsGrid);
dotsGrid.position.x = -25;
dotsGrid.position.y = 0;
dotsGrid.position.z = -40;

const sun = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 5),
  new THREE.MeshBasicMaterial({
    map: sunTexture,
    alphaMap: sunTextureAlpha,
    transparent: true
  })
);
scene.add(sun);
sun.position.x = -12;
sun.position.y = 10;
sun.position.z = -35;

function moveCamera() {
  const top = document.body.getBoundingClientRect().top;
  const scrollY = window.scrollY;

  // let angle = -0.015 * scrollY;
  // sun.position.x = (14 + angle) * Math.cos(angle) + 16;
  // sun.position.y = (14 + angle) * Math.sin(angle) + 10;
  // sun.position.z = -35 + (scrollY * 0.1);
  // sun.position.x = 16 + (-0.015 * scrollY);
  // sun.position.y = 10 + (-0.015 * scrollY);
  // sun.position.x = -35 + (0.1 * scrollY);

  camera.position.x = top * -0.075;
  camera.position.z = top * 0.1;
}
document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
*/
