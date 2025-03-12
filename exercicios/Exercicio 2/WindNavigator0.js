class Baloom {
  constructor(element, options) {
    const {x, y} = options;
      this.pos = { x: x, y: y };
      this.largura = 142;
      this.altura = 179;
      this.velocidade = 3;
      this.baloomElement = element;
  }

  update() {
      this.baloomElement.style.left = this.pos.x + "px";
      this.baloomElement.style.top = this.pos.y + "px";
      this.baloomElement.style.width = this.largura + "px";
      this.baloomElement.style.height = this.altura + "px";
  }

  addBallomAnimation() {
    this.baloomElement.classList.add("ballom-animation")
  }

  addDisappearEventTrigger(){
    this.baloomElement.addEventListener("mousedown", () => {
      this.baloomElement.style.animation = "disappear 500ms ease-in forwards";
    }, false);

  }
}

class Game {
  constructor() {

      const assets = this.loadAssets();

      this.baloom = new Baloom(assets["0"], {
        x: 250,
        y: 150
      });
      this.baloom.addDisappearEventTrigger();
      this.baloom.addBallomAnimation();

      this.baloom2 = new Baloom(assets["1"], {
        x: 550,
        y: 250
      });
      this.baloom2.addDisappearEventTrigger();
      this.baloom2.addBallomAnimation();

      this.fps = 1000 / 30;
      this.keys = {};
      this.timeHandler;
      this.direction = "O";
      this.screen = {
        limitWidth: window.innerWidth,
        limitHeight: window.innerHeight
      }
  }

  loadAssets() {
    const files = [
      {
        "name": "ship",
        "src": "assets/ship.png"
      },
      {
        "name": "tRex",
        "src": "assets/tRex.png"
      }
    ]

    let assets = [];

    files.forEach(file => {
      let img = new Image();
      img.src = file.src;
      img.id = `id-${file.name}`;
      assets.push(img);

      document.getElementById('world').prepend(img);
    });
    

    return assets;
  }

  start() {
      console.log(this.direction);
      this.timeHandler = setInterval(() => this.cycle(), this.fps);
      window.addEventListener("keydown", (e) => this.keyPressed(e), false);
      window.addEventListener("keyup", (e) => this.keyReleased(e), false);
  }

  keyPressed(e) {
      this.keys[e.code] = true;
  }

  keyReleased(e) {
      this.keys[e.code] = false;
  }

  cycle() {
      this.controlInputs(this.baloom);
      this.controlInputs(this.baloom2);

      this.baloom.update();
      this.baloom2.update();
      this.updatePanel();
  }

  checkKeys() {
      const { keys } = this;

      if (keys['ArrowUp'] && keys['ArrowRight']) this.direction = "NE";
      else if (keys['ArrowUp'] && keys['ArrowLeft']) this.direction = "NO";
      else if (keys['ArrowDown'] && keys['ArrowRight']) this.direction = "SE";
      else if (keys['ArrowDown'] && keys['ArrowLeft']) this.direction = "SO";
      else if (keys['ArrowUp']) this.direction = "N";
      else if (keys['ArrowDown']) this.direction = "S";
      else if (keys['ArrowRight']) this.direction = "E";
      else if (keys['ArrowLeft']) this.direction = "O";
  }

  controlInputs(element) {
      this.checkKeys();

      // stop moviment if the baloon is in the limit of the screen
      if(this.reachedScreenLimit(element)) return;
      
      switch (this.direction) {
          case "N":
              element.pos.y -= element.velocidade;
              break;
          case "S":
              element.pos.y += element.velocidade;
              break;
          case "E":
              element.pos.x += element.velocidade;
              break;
          case "O":
              element.pos.x -= element.velocidade;
              break;
          case "NE":
              element.pos.y -= element.velocidade;
              element.pos.x += element.velocidade;
              break;
          case "NO":
              element.pos.y -= element.velocidade;
              element.pos.x -= element.velocidade;
              break;
          case "SE":
              element.pos.y += element.velocidade;
              element.pos.x += element.velocidade;
              break;
          case "SO":
              element.pos.y += element.velocidade;
              element.pos.x -= element.velocidade;
              break;
      }
  }

  reachedScreenLimit(element) {
    // para o movimento se o balão atingir o limite da tela
    if (element.pos.x <= 0 && this.direction === "O") {
      this.direction = "E";
        return true;
    };

    if (element.pos.x >= this.screen.limitWidth - element.largura && this.direction === "E") {
      this.direction = "O";
        return true;
    };

    if (element.pos.y <= 0 && this.direction === "N"){
      this.direction = "S";
      return true
    };
    if (element.pos.y >= this.screen.limitHeight - element.altura && this.direction === "S") {
      this.direction = "N";
      return true
    };

    return false;
  }

  updatePanel() {
    document.getElementById("maltitude").innerHTML = Math.floor(screen.height - this.baloom.pos.y - this.baloom.altura ) + " m";
    document.getElementById("mvelocidade").innerHTML = this.baloom.velocidade + " km/h";
  }

}


let game = new Game();
game.start();

