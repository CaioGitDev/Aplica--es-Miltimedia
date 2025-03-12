var dino;
const estados = {
    IDLE: [],
    WALK: [],
    JUMP: [],
    RUN: [],
    DEAD: []
};

var posX = 260;
var vx = 30;


// Carregar sons



// Arrays de imagens para os estados do Dino
var run = ['Run (1).png', 'Run (2).png', 'Run (3).png', 'Run (4).png',
    'Run (5).png', 'Run (6).png', 'Run (7).png', 'Run (8).png'];

var jump = ['Jump (1).png', 'Jump (2).png', 'Jump (3).png', 'Jump (4).png',
    'Jump (5).png', 'Jump (6).png', 'Jump (7).png', 'Jump (8).png',
    'Jump (9).png', 'Jump (10).png', 'Jump (11).png', 'Jump (12).png'];



    var currentFrame = 0;
    var frames = [];
    var loadedImages = 0;

// Iniciar carregamento ao carregar a página
window.addEventListener("load", init, false);

function init(e) {
    load();
}

// Função para carregar todas as imagens
function load() {
    carregarSprites();

}

// Função genérica para carregar imagens
function carregarSprites() {
    for (let i = 0; i < run.length; i++) {
        let sprite = new Image();
        sprite.addEventListener("load", loadedRun, false);
        sprite.src = "assets/dino/" + run[i];
        console.log(sprite.src);
    }
    
    for (let i = 0; i < jump.length; i++) {
        let sprite = new Image();
        sprite.addEventListener("load", loadedJump, false);
        sprite.src = "assets/dino/" + jump[i];
        console.log(sprite.src);
    }
}

// Funções chamadas ao carregar cada estado
function loadedRun(e) { estados.RUN.push(e.currentTarget); loaded(); }
function loadedJump(e) { estados.JUMP.push(e.currentTarget); loaded(); }


// Verifica se todas as imagens foram carregadas
function loaded() {
    loadedImages++;
    if (loadedImages === (run.length + jump.length )){
        setup();
    }
}

// Configuração inicial do jogo
function setup() {
    frames = estados.RUN;
    dino = frames[0];

    document.getElementById("world").appendChild(dino);

    window.addEventListener("keyup", trocaEstado, false);
  

    startGame();
}

// Trocar estado com base nas teclas pressionadas
function trocaEstado(e) {

    switch (e.code) {
       
        case 'ArrowRight':  // Correr 
                currentFrame = 0;
                frames = estados.RUN;
                vx = 30;
        break;

        case 'ArrowUp':  // Pular
                isJumping = true;
                currentFrame = 0;
                frames = estados.JUMP;
                vx = 30; 
        break;
    }
}


// Iniciar o loop do jogo
function startGame() {
    timeHandler = setInterval(CicloDeJogo, 1000 / 12);
}

// Atualiza o jogo a cada frame
function CicloDeJogo() {
    currentFrame = (++currentFrame) % frames.length;
    console.log("Frame:", currentFrame);

    document.getElementById("world").replaceChild(frames[currentFrame], dino);
    dino = frames[currentFrame];

    posX += vx;
    dino.style.left = posX + "px";

    if (posX > 1280) posX = -200;

   
}