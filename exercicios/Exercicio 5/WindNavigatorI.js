//define oBalao e as condicoes iniciais do balao (vem do exercicio anterior das animacoes CSS)
let oBalao;
let dir = "E";
let largura = 142;
let altura = 179;
let pos_x = 260;
let pos_y = 100;

//definir aBase e as condicoes iniciais se as houver
let ancor = false;


//definir objeto para guardar teclas pressionadas
let teclas = {};


//definir constantes do temporizador (frames)
let fps = 1000 / 60; // Taxa de atualização do jogo
let timeHandler;
let velocidade = 1;

// Definição dos estados de movimento vertical (zoom)
var zMotion = {
  STILL: 0,  // Parado
  APROX: 1,  // Aproximar câmera
  AWAY: 2,   // Afastar câmera
};

zDir = zMotion.STILL;

// Dimensões iniciais do balão
var bAR = largura / altura; // Proporção do balão


//chamar a funcao para o arranque do jogo
window.addEventListener("load", carrega_assets, false);

//definir os assets todos que queremos carregar antes de arrancar o jogo
function carrega_assets() { //cria o objeto do tipo Imagem
  // Criar dinamicamente a imagem do balão
  oBalao = document.createElement("img");
  oBalao.src = "assets/ship.png"; // Caminho da imagem do balão
  oBalao.id = "ship";
  oBalao.style.width = largura + "px";
  oBalao.style.height = altura + "px";
  oBalao.style.top = pos_y + "px";
  oBalao.style.left = pos_x + "px";
  oBalao.style.cursor = "pointer";
  oBalao.draggable = true;
  oBalao.addEventListener("load", inicio_jogo);

// Criar dinamicamente a imagem da base
  aBase = document.createElement("div");
  aBase.style.backgroundImage = "url('assets/landingBase.png')";
  aBase.id = "base";
  aBase.style.top = "500px";
  aBase.style.left ="750px";
  aBase.style.width = "222px";
  aBase.style.height = "200px";
  aBase.style.position = "absolute";
  aBase.style.display = "block";
  aBase.style.backgroundPosition = "bottom";
  aBase.style.backgroundRepeat = "no-repeat";
  aBase.addEventListener("load", inicio_jogo)

}



//definir a função do arranque do jogo - adicionar a classe de balançar e o listener para o furo
function inicio_jogo(e) {
  const world = document.getElementById("world"); 

  //adicionar a div da base ao HTML
  world.appendChild(aBase);

  //alterar para que oBalao se torne irmao da aBase
  world.insertBefore(oBalao, world.firstChild); 

  window.addEventListener("keydown", teclaPressionada, false);
  window.addEventListener("keyup", teclaLibertada, false);

  // Adicionar eventos de drag & drop
  oBalao.addEventListener("dragstart", startDrag, false);
  aBase.addEventListener("dragover", allowDrag, false);
  aBase.addEventListener("dragleave", leaveDrop, false);
  aBase.addEventListener("drop", drop, false);


  
  timeHandler = setInterval(CicloDeJogo, fps); // Inicia o loop do jogo

  //desnecessário para esta demonstracao
 /* ball = document.getElementById("ship");
    ball.className="balanca";
    
    ball.addEventListener("mousedown", ratoPressionado, false);
*/
}


//adicionar as funcoes de drag & drop
function startDrag (e) {
  e.dataTransfer.setData("text/plan", e.currentTarget.id);
  e.currentTarget.classList.add("dragging");
}

function allowDrag(e) {
  e.preventDefault();
  e.currentTarget.classList.add("over");
  aBase.style.backgroundImage = "url('assets/landingBase-hover.png')";
}

function leaveDrop(e) {
  e.currentTarget.classList.remove("over");
  aBase.style.backgroundImage = "url('assets/landingBase.png')";
}

function drop(e) {
  e.preventDefault();
  const idBallon = e.dataTransfer.getData("text/plan");
  const ballon = document.getElementById(idBallon);

  ballon.style.position = "relative";
  ballon.style.top = "0px";
  ballon.style.left ="50px";
  ballon.style.width = oBalao.largura;
  ballon.style.height = oBalao.altura;
  

  ancor = true;
  e.target.appendChild(ballon);
  ballon.classList.remove("dragging");
}



//definir a função do ciclo do jogo
function CicloDeJogo(e) {
  verTeclas();
  controloInput(); // Move o balão conforme a direção
  oBalao.style.left = pos_x + "px";
  oBalao.style.top = pos_y + "px";
  oBalao.style.width = largura + "px";
  oBalao.style.height = altura + "px";
  atualizarPainel(); // Atualiza o painel de informações
}




//definir o que acontece quando o rato é pressionado sobre o balão
function ratoPressionado(e) {
  e.currentTarget.classList.remove("balanca");
  e.currentTarget.classList.add("furado");
}





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
  if (teclas['ArrowUp'] && teclas['ArrowLeft']) dir = "NO";
  else if (teclas['ArrowUp'] && teclas['ArrowRight']) dir = "NE";
  else if (teclas['ArrowDown'] && teclas['ArrowLeft']) dir = "SO";
  else if (teclas['ArrowDown'] && teclas['ArrowRight']) dir = "SE";
  else if (teclas['ArrowUp']) dir = "N";
  else if (teclas['ArrowDown']) dir = "S";
  else if (teclas['ArrowLeft']) dir = "O";
  else if (teclas['ArrowRight']) dir = "E";

  // Ajusta a altitude do balão
  if (teclas["ControlLeft"]) zDir = zMotion.APROX;
  else if (teclas["ShiftLeft"]) zDir = zMotion.AWAY;
  else if (teclas["Space"]) zDir = zMotion.STILL;

  // Ajusta a velocidade do balão
  if (teclas["NumpadAdd"]) velocidade = velocidade + 2 < 10 ? velocidade + 2 : 10;
  else if (teclas["NumpadSubtract"]) velocidade = velocidade - 2 < 1 ? 1 : velocidade - 2;
}


// Função para mover o balão conforme a direção definida e ajustar o tamanho do balão conforme a altura simulada
// Função para mover o balão conforme a direção definida e ajustar o tamanho do balão conforme a altura simulada
function controloInput() {

    if(ancor){
        pos_x = 50;
        pos_y = 0;
        velocidade = 0;
        return;
    }

  switch (dir) {
    case "N":
      pos_y -= velocidade;  // Move para cima
      break;
    case "S":
      pos_y += velocidade;  // Move para baixo
      break;
    case "O":
      pos_x -= velocidade;  // Move para a esquerda
      break;
    case "E":
      pos_x += velocidade;  // Move para a direita
      break;
    case "NO":
      pos_y -= velocidade;  // Move para cima e esquerda
      pos_x -= velocidade;
      break;
    case "NE":
      pos_y -= velocidade;  // Move para cima e direita
      pos_x += velocidade;
      break;
    case "SO":
      pos_y += velocidade;  // Move para baixo e esquerda
      pos_x -= velocidade;
      break;
    case "SE":
      pos_y += velocidade;  // Move para baixo e direita
      pos_x += velocidade;
      break;
  }

  // Ajusta o tamanho do balão conforme a altitude simulada
  if (zDir != zMotion.STILL) {
    if (zDir == zMotion.APROX) {
      largura += 1;  // Aumenta a largura
    }
    else if (zDir == zMotion.AWAY) {
      largura -= 1;  // Diminui a largura
    }

    altura = largura / bAR;  // Ajusta a altura conforme a proporção
  }
}


 //definir a funcao para atualizar o painel de informações da altitude e altura 
 function atualizarPainel() {
	document.getElementById("maltitude").innerHTML = (screen.height - pos_y) + " m";
	document.getElementById("mvelocidade").innerHTML = velocidade + " km/h";
}







