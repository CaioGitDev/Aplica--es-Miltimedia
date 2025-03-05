class Baloom {
  constructor() {
      this.pos = { x: 250, y: 150 };
      this.largura = 142;
      this.altura = 179;
      this.velocidade = 3;
      this.baloomElement = document.getElementById('ship');
  }

  update() {
      this.baloomElement.style.left = this.pos.x + "px";
      this.baloomElement.style.top = this.pos.y + "px";
      this.baloomElement.style.width = this.largura + "px";
      this.baloomElement.style.height = this.altura + "px";
  }

  addDisappearEventTrigger(){
    this.baloomElement.addEventListener("mousedown", () => {
      this.baloomElement.style.animation = "disappear 3s forwards";
    }, false);

  }
}

class Game {
  constructor() {
      this.baloom = new Baloom();
      this.baloom.addDisappearEventTrigger();
      this.fps = 1000 / 30;
      this.keys = {};
      this.timeHandler;
      this.direction = "O";
      this.screen = {
        limitWidth: window.innerWidth,
        limitHeight: window.innerHeight
      }
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
      this.controlInputs();
      this.baloom.update();
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

  controlInputs() {
      this.checkKeys();

      // stop moviment if the baloon is in the limit of the screen
      if(this.reachedScreenLimit()) return;
      
      switch (this.direction) {
          case "N":
              this.baloom.pos.y -= this.baloom.velocidade;
              break;
          case "S":
              this.baloom.pos.y += this.baloom.velocidade;
              break;
          case "E":
              this.baloom.pos.x += this.baloom.velocidade;
              break;
          case "O":
              this.baloom.pos.x -= this.baloom.velocidade;
              break;
          case "NE":
              this.baloom.pos.y -= this.baloom.velocidade;
              this.baloom.pos.x += this.baloom.velocidade;
              break;
          case "NO":
              this.baloom.pos.y -= this.baloom.velocidade;
              this.baloom.pos.x -= this.baloom.velocidade;
              break;
          case "SE":
              this.baloom.pos.y += this.baloom.velocidade;
              this.baloom.pos.x += this.baloom.velocidade;
              break;
          case "SO":
              this.baloom.pos.y += this.baloom.velocidade;
              this.baloom.pos.x -= this.baloom.velocidade;
              break;
      }
  }

  reachedScreenLimit() {
    // para o movimento se o balão atingir o limite da tela
    if (this.baloom.pos.x <= 0 && this.direction === "O") {
      this.direction = "E";
        return true;
    };

    if (this.baloom.pos.x >= this.screen.limitWidth - this.baloom.largura && this.direction === "E") {
      this.direction = "O";
        return true;
    };

    if (this.baloom.pos.y <= 0 && this.direction === "N"){
      this.direction = "S";
      return true
    };
    if (this.baloom.pos.y >= this.screen.limitHeight - this.baloom.altura && this.direction === "S") {
      this.direction = "N";
      return true
    };

    return false;
  }

  updatePanel() {
    document.getElementById("maltitude").innerHTML = Math.floor(screen.height - oBalao.pos.y - oBalao.altura ) + " m";
    document.getElementById("mvelocidade").innerHTML = oBalao.velocidade + " km/h";
  }

}


let game = new Game();
game.start();

