//definir o balão

const oBalao = {
    pos : { x: 250, y: 150 },
    largura : 142,              //largura da imagem
    altura: 179,
    zDir: 0,
    dir: "E",
    velocidade :3,              //velocidade de deslocação
    update: function(){         //método que atualiza a posição e as dimensões do elemento HTML representado pelo "oBalao" na tela.
        let baloon = document.getElementById('ship');
        baloon.style.left   = this.pos.x; //coloca o atributo left na pos x
        baloon.style.top    = this.pos.y; // coloca o atributo width na pos y
        baloon.style.width  = this.largura + "px"; //define o atributo width como a largura
        baloon.style.height = this.altura + "px";; //define o atributo height como auto
    }

};

// Definição dos estados de movimento vertical (zoom)
var zMotion = {
  STILL: 0,  // Parado
  APROX: 1,  // Aproximar câmera
  AWAY: 2,   // Afastar câmera
};
dir="E";
zDir = zMotion.STILL;

// Dimensões iniciais do balão
var bAR = oBalao.largura / oBalao.altura; // Proporção do balão

//definir objeto para guardar teclas pressionadas
  let teclas = {}; 
  
  
//definir constantes do temporizador (frames)
  var fps = 1000 / 30; // Taxa de atualização do jogo
  var timeHandler;
 
//chamar a funcao para o arranque do jogo
  window.addEventListener("load", inicio_jogo, false);

//definir a função do ciclo do jogo
function CicloDeJogo(e) {
    verTeclas();
    controloInput(); // Move o balão conforme a direção
    oBalao.update();
    atualizarPainel(); // Atualiza o painel de informações
  }

//definir a função do arranque do jogo - adicionar a classe de balançar e o listener para o furo
function inicio_jogo(e) {
    
    timeHandler = setInterval(CicloDeJogo, fps); // Inicia o loop do jogo


    window.addEventListener("keydown", teclaPressionada, false);
    window.addEventListener("keyup", teclaLibertada, false);
    
    
  
  
  }

//definir o que acontece quando o rato é pressionado sobre o balão






//definir o que acontece quando uma tecla é pressionada
function teclaPressionada(e) {
    teclas[e.code] = true;
}

//definir o que acontece quando uma tecla é largada
function teclaLibertada(e) {
    teclas[e.code] = false;
}

// definir a Função para verificar as teclas pressionadas e ajustar a direção
function verTeclas() {
  if(teclas['ArrowUp'] && teclas['ArrowLeft']) dir="NO";
  else if(teclas['ArrowUp'] && teclas['ArrowRight']) dir="NE";
  else if(teclas['ArrowDown'] && teclas['ArrowLeft']) dir="SO";
  else if(teclas['ArrowDown'] && teclas['ArrowRight']) dir="SE";
  else if(teclas['ArrowUp']) dir="N";
  else if(teclas['ArrowDown']) dir="S";
  else if(teclas['ArrowLeft']) dir="O";
  else if(teclas['ArrowRight']) dir="E";

// Ajusta a altitude do balão
if (teclas["ControlLeft"]) zDir = zMotion.APROX;
else if (teclas["ShiftLeft"]) zDir = zMotion.AWAY;
else if (teclas["Space"]) zDir = zMotion.STILL; 

// Ajusta a velocidade do balão
if (teclas["NumpadAdd"]) velocidade = velocidade + 2 < 10 ? velocidade + 2 : 10;
else if (teclas["NumpadSubtract"]) velocidade = velocidade - 2 < 1 ? 1 : velocidade - 2;
  }


 // Função para mover o balão conforme a direção definida e ajustar o tamanho do balão conforme a altura simulada
 function controloInput() {
   console.log(dir);
      switch (dir) {
        case "N":
          oBalao.pos.y-= oBalao.velocidade;
          break;
        case "S":
          oBalao.pos.y+= oBalao.velocidade;
          break;
        case "O":
          oBalao.pos.x-=oBalao.velocidade;
          break;
        case "E":
          oBalao.pos.x+=oBalao.velocidade;
          break;
        case "NO":
          oBalao.pos.y-= oBalao.velocidade;
          oBalao.pos.x-=oBalao.velocidade;
          break;
        case "NE":
          oBalao.pos.y-= oBalao.velocidade;
          oBalao.pos.x+=oBalao.velocidade;
          break;
        case "SO":
          oBalao.pos.y+=oBalao.velocidade; 
          oBalao.pos.x-=oBalao.velocidade;
          break;
        case "SE":
          oBalao.pos.y+= oBalao.velocidade; 
          oBalao.pos.x+=oBalao.velocidade;
          break;
    }

   // Ajusta o tamanho do balão conforme a altitude simulada
  if (zDir != zMotion.STILL) {
    if (zDir == zMotion.APROX) {
      oBalao.largura += 1;
    }
    else if (zDir == zMotion.AWAY) {
      oBalao.largura -= 1;
    }

    oBalao.altura = oBalao.largura / bAR;
   }
  }

  
   

 //definir a funcao para atualizar o painel de informações da altitude e altura 
 function atualizarPainel() {
    document.getElementById("maltitude").innerHTML = Math.floor(screen.height - oBalao.pos.y - oBalao.altura ) + " m";
    document.getElementById("mvelocidade").innerHTML = oBalao.velocidade + " km/h";
  }


//animacoes CSS



  
  


  // Dimensões iniciais do balão
 
  
  