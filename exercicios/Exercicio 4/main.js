class Dino {
  #moviments = {
    IDLE: {
      steps: 10,
      imageSequence: 'Idle ({step}).png'
    },
    WALK: {
      steps: 10,
      imageSequence: 'Walk ({step}).png'
    },
    JUMP: {
      steps: 12,
      imageSequence: 'Jump ({step}).png'
    },
    RUN: {
      steps: 8,
      imageSequence: 'Run ({step}).png'
    },
    DEAD: {
      steps: 8,
      imageSequence: 'Dead ({step}).png'
    }
  }

  constructor() {

  }


  getDinoMoviments(){
    return this.#moviments;
  }

}

class Game {
  #isLoading = false;
  constructor(rootElement) {
    this.DinoPlayer = new Dino();
    this.rootElement = rootElement;
  }

  async initAsync() {
    await this.loadSpritesAsync();
    this.loadSound();
  }

  async loadSpritesAsync() {
    this.#isLoading = true;
    console.log('loading sprites init');
    const moviments = this.DinoPlayer.getDinoMoviments();

    await this.processSpritesAsync(moviments, this.isLoaded.bind(this));

  }

  async processSpritesAsync(moviments, callback) {
    const sprites = [];
    for (const key in moviments) {
      const moviment = moviments[key];
      for (let i = 1; i <= moviment.steps; i++) {
        const img = new Image();
        img.addEventListener
        img.src = `assets/dino/${moviment.imageSequence.replace('{step}', i)}`;
        console.log(`loading ${img.src}`);
        sprites.push(img);
      }
    }

    await Promise.all(sprites.map(img => new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    })));

    callback();
  }

  isLoaded() {
    console.log('sprites loaded');
    this.#isLoading = false;
  }

  loadSound() {

  }



}

document.addEventListener('DOMContentLoaded', async () => {
  const game = new Game(document.getElementById('world'))
  await game.initAsync();
})
