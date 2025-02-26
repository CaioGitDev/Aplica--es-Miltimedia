class Baloom {
  constructor() {
      this.pos = { x: 250, y: 150 };
      this.largura = 142;
      this.altura = 179;
      this.velocidade = 3;
  }

  update() {
      let baloon = document.getElementById('ship');
      baloon.style.left = this.pos.x + "px";
      baloon.style.top = this.pos.y + "px";
      baloon.style.width = this.largura + "px";
      baloon.style.height = this.altura + "px";
  }
}

class Game {
  constructor() {
      this.baloom = new Baloom();
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

    // if (this.baloom.pos.x <= 0 && this.baloom.pos.y <= 0 && this.direction === "NO") {
    //   this.direction = "SE";
    //   return true
    // };

    // if (this.baloom.pos.x >= this.screen.limitWidth - this.baloom.largura && this.baloom.pos.y <= 0 && this.direction === "NE") {
    //   this.direction = "SO";
    //   return true
    // }

    // if (this.baloom.pos.x <= 0 && this.baloom.pos.y >= this.screen.limitHeight - this.baloom.altura && this.direction === "SO") {
    //   this.direction = "NE";
    //   return true
    // }

    // if (this.baloom.pos.x >= this.screen.limitWidth - this.baloom.largura && this.baloom.pos.y >= this.screen.limitHeight - this.baloom.altura && this.direction === "SE") {
    //   this.direction = "NO";
    //   return true
    // }

    return false;
  }
  updatePanel() {}

}


let game = new Game();
game.start();


// // Definição dos estados de movimento vertical (zoom)
// const ZOOM_IN = 1;
// const ZOOM_OUT = 2;
// const ZOOM_NONE = 0;


// // Inicialização da direção e do estado de zoom
// let direcao = 0;
// let zoom = ZOOM_NONE;


// //definir objeto para guardar teclas pressionadas
//   let teclas = {}; 
  
  
// //definir constantes do temporizador (frames)
//   var fps = 1000 / 30; // Taxa de atualização do jogo
//   var timeHandler;
 
// //chamar a funcao para o arranque do jogo
//   window.addEventListener("load", inicio_jogo, false);

// //definir a função do ciclo do jogo
// function CicloDeJogo(e) {
//     controloInput(); // Move o balão conforme a direção
//     oBalao.update();
//     atualizarPainel(); // Atualiza o painel de informações
//   }

// //definir a função do arranque do jogo
// function inicio_jogo(e) {
//     timeHandler = setInterval(CicloDeJogo, fps); // Inicia o loop do jogo
//     window.addEventListener("keydown", teclaPressionada, false);
//     window.addEventListener("keyup", teclaLibertada, false);
//   }

// //definir o que acontece quando uma tecla é pressionada
// function teclaPressionada(e) {
//     teclas[e.code] = true;
// }

// //definir o que acontece quando uma tecla é largada
// function teclaLibertada(e) {
//     teclas[e.code] = false;
// }

// // definir a Função para verificar as teclas pressionadas e ajustar a direção
// function verTeclas() {
//     if (teclas["ArrowUp"]) {
//       direcao = 1;
//     } else if (teclas["ArrowDown"]) {
//       direcao = 2;
//     } else if (teclas["ArrowLeft"]) {
//       direcao = 3;
//     } else if (teclas["ArrowRight"]) {
//       direcao = 4;
//     } else {
//       direcao = 0;
//     }

//   }

//  // Função para mover o balão conforme a direção definida e ajustar o tamanho do balão conforme a altura simulada
//  function controloInput() {
    
//     verTeclas();
//     switch (direcao) {
//       case 1:
//         oBalao.pos.y -= oBalao.velocidade;
//         break;
//       case 2:
//         oBalao.pos.y += oBalao.velocidade;
//         break;
//       case 3:
//         oBalao.pos.x -= oBalao.velocidade;
//         break;
//       case 4:
//         oBalao.pos.x += oBalao.velocidade;
//         break;
//     }
    
//   }
   

//  //definir a funcao para atualizar o painel de informações da altitude e altura 
//  function atualizarPainel() {
//     document.getElementById("maltitude").innerHTML = Math.floor(screen.height - oBalao.pos.y - oBalao.altura ) + " m";
//     document.getElementById("mvelocidade").innerHTML = oBalao.velocidade + " km/h";
//   }





  
  


  // Dimensões iniciais do balão



 
  
  