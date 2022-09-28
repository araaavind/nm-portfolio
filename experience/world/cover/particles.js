import * as THREE from 'three';
import Experience from '../../experience';

export default class Particles {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.world = this.experience.world;
        this.resources = this.experience.resources;

        this.nx = 59;
        this.ny = 34;
        this.w = .613556;
        this.h = 1.06470;
        this.particleGeometry = new THREE.BufferGeometry();
        this.vertices = new Float32Array(this.nx * this.ny * 3);

        this.setParticles();
        this.switchDevice(this.sizes.device);
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
        this.particleMesh = new THREE.Points(
            this.particleGeometry,
            new THREE.PointsMaterial({
                color: '#cccccc',
                size: 6,
                map: this.resources.items.dot,
                transparent: true,
                depthTest: false,
                alphaTest: .5
            })
        );
        this.scene.add(this.particleMesh);
    }

    switchDevice(device) {
        if (device === 'desktop') {
            this.scale = 1;
            this.x = -(((this.nx * this.w) - this.w) / 2) * this.scale - (this.sizes.width / 72);
            this.y = -(((this.ny * this.h) - this.h) / 2) * this.scale - 1.25;
            this.z = 0;
            this.lineY = 38.85;
        } else {
            this.scale = .65;
            this.x = -(((this.nx * this.w) - this.w) / 2) * this.scale;
            this.y = -(((this.ny * this.h) - this.h) / 2) * this.scale + (this.sizes.height / 144);
            this.z = 0;
            this.lineY = 40.6;
        }
        this.resize();
    }

    resize() {
        this.particleMesh.position.set(this.x, this.y, this.z);
        this.particleMesh.scale.set(this.scale, this.scale);
        if (this.world.controls) {
            this.world.controls.resize();
        }
    }

    update() { }
}
