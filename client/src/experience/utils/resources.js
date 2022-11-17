import * as THREE from 'three';
import { EventEmitter } from 'events';

import Experience from '../experience';

export default class Resources extends EventEmitter {
  constructor(assets) {
    super();
    this.experience = new Experience();
    this.renderer = this.experience.renderer;
    this.assets = assets;
    this.items = {};
    this.queue = this.assets.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.textureLoader = new THREE.TextureLoader();
  }

  startLoading() {
    for (const asset of this.assets) {
      if (asset.type === 'imageTexture') {
        this.loaders.textureLoader.load(asset.path, (file) => this.singleAssetLoad(asset, file));
      }
    }
  }

  singleAssetLoad(asset, file) {
    this.items[asset.name] = file;
    this.loaded++;
    if (this.loaded === this.queue) {
      setTimeout(() => {
        this.emit('ready');
      }, 500);
    }
  }
}
