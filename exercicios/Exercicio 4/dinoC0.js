class Dino {
    constructor() {
        this.configs = {
            moviments: {
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
            },
        }

        this.style = {
            left: 0
        }
        
    }
}


class Game{
    constructor(){
        this.dinoObject = new Dino();
        this.status = {
            IDLE: [],
            WALK: [],
            JUMP: [],
            RUN: [],
            DEAD: []
        }
        this.currentFrame = 0;
        this.frames = [];
        this.loadedImages = 0;
        this.vx = 30;
        this.posX = 260;
        this.isJumping = false;
        this.timeHandler = null;
        this.rootElement = document.getElementById("world");
        this.isDead = false;

        this.jumpSound = new Audio("assets/jump.wav");
        this.deathSound = new Audio("assets/dead2.wav");
    }

    init = () => {
        this.load();
    }

    load= () =>{
        this.carregarSprites();
    }

    carregarSprites = () => {
        const { moviments } = this.dinoObject.configs;
        // RUN MOVIMENT
        this.carregarSprite(moviments.RUN, this.loadedRun);
        this.carregarSprite(moviments.WALK, this.loadedWalk);
        this.carregarSprite(moviments.JUMP, this.loadedJump);
        this.carregarSprite(moviments.DEAD, this.loadedDead);
        this.carregarSprite(moviments.IDLE, this.loadedIdle);

    }

    carregarSprite = (steps, callback) => {
        for (let i = 0; i < steps.steps; i++) {
            let sprite = new Image();
            sprite.addEventListener("load", callback, false);
            sprite.src = "assets/dino/" + steps.imageSequence.replace('{step}', i + 1);
            console.log(sprite.src);
        }
    }

    loadedRun = (e) =>  { this.status.RUN.push(e.currentTarget); this.loaded(); }
    loadedWalk = (e) => { this.status.WALK.push(e.currentTarget); this.loaded(); }
    loadedJump = (e) => { this.status.JUMP.push(e.currentTarget); this.loaded(); }
    loadedDead = (e) => { this.status.DEAD.push(e.currentTarget); this.loaded(); }
    loadedIdle = (e) => { this.status.IDLE.push(e.currentTarget); this.loaded(); }

    loaded= () => {
        const { moviments } = this.dinoObject.configs;

        this.loadedImages++;
        if (this.loadedImages === (moviments.RUN.steps + moviments.WALK.steps + moviments.JUMP.steps + moviments.DEAD.steps + moviments.IDLE.steps)){
            this.setup();
        }
    }

    setup = () => {
        
        this.frames = this.status.WALK;
        this.dinoImage = this.frames[0];
        document.getElementById("world").appendChild(this.dinoImage);

        window.addEventListener("keydown", this.trocaEstado, false);
        window.addEventListener("keyup", this.stopMoviment, false);

      

        this.startGame();
    }

    stopMoviment = (e) => {

        // check if is dead
        if(this.isDead) return;

       if(e.code === 'ArrowUp' || e.code === 'ArrowRight'){
        this.currentFrame = 0;
        this.frames = this.status.WALK;
        this.vx = 30;
       }
       else if (e.code === 'Space'){
            this.currentFrame = 0;
            this.frames = this.status.DEAD;
            this.vx = 0;
       }
    }
    
    trocaEstado = (e) => {

        // check if is dead
        if(this.isDead) return;


        const { moviments } = this.dinoObject.configs;

        switch (e.code) {
           
            case 'ArrowRight':  // Correr 
                if (e.repeat) return;
                if (!this.isJumping) {    
                    this.currentFrame = 0;
                    this.frames = this.status.RUN;
                    this.vx = 30;
                }
                  
                break;
            case 'ArrowUp':  // Pular
                    //if(e.repeat) return;

                    this.isJumping = true;
                    this.currentFrame = 0;
                    this.frames = this.status.WALK;
                    this.jumpSound.play();
                    this.vx = 15;
                break;
            case 'ArrowLeft':
                this.currentFrame = 0;
                    this.frames = this.status.WALK;
                    this.vx = 15;
                break;
            case 'Space': 
                if(e.repeat) return;

                this.currentFrame = 0;
                this.frames = this.status.DEAD;
                this.deathSound.play();
                this.vx = 0;
                this.isDead = true;
            break;
            case 'KeyR': 
                this.restartGame();
            break;
        }
    }

    restartGame = () => {
        this.currentFrame = 0;
        this.frames = this.status.WALK;
        this.vx = 15;
        this.posX = 260;
        this.isJumping = false;
        this.isDead = false;
    }

    startGame = () => {
        this.timeHandler = setInterval(this.CicloDeJogo, 1000 / 12);
    }

    CicloDeJogo = () => {
        this.currentFrame = (++this.currentFrame) % this.frames.length;

        if(this.isDead){
            // this.currentFrame = this.frames.length - 1;
             console.log(this.currentFrame)

             document.getElementById("world").replaceChild(this.frames[this.currentFrame], this.dinoImage);
             

             if(this.currentFrame === 7){
                document.getElementById("world").replaceChild(this.frames[this.currentFrame], this.frames[7]);
                this.dinoImage = this.frames[this.currentFrame];
                
                this.dinoImage.style.left = this.posX + "px";
             }
            

        }else {
            
            document.getElementById("world").replaceChild(this.frames[this.currentFrame], this.dinoImage);
            this.dinoImage = this.frames[this.currentFrame];

            this.posX += this.vx;
            this.dinoImage.style.left = this.posX + "px";

            if (this.posX > 1280) this.posX = -200;
        }

        
    }

    stopGame(){
        clearInterval(this.timeHandler);
    }
}


const game = new Game();
game.init();

// var dino;
// const estados = {
//     IDLE: [],
//     WALK: [],
//     JUMP: [],
//     RUN: [],
//     DEAD: []
// };

// var posX = 260;
// var vx = 30;


// // Carregar sons



// // Arrays de imagens para os estados do Dino
// var run = ['Run (1).png', 'Run (2).png', 'Run (3).png', 'Run (4).png',
//     'Run (5).png', 'Run (6).png', 'Run (7).png', 'Run (8).png'];

// var jump = ['Jump (1).png', 'Jump (2).png', 'Jump (3).png', 'Jump (4).png',
//     'Jump (5).png', 'Jump (6).png', 'Jump (7).png', 'Jump (8).png',
//     'Jump (9).png', 'Jump (10).png', 'Jump (11).png', 'Jump (12).png'];



//     var currentFrame = 0;
//     var frames = [];
//     var loadedImages = 0;

// // Iniciar carregamento ao carregar a página
// window.addEventListener("load", init, false);

// function init(e) {
//     load();
// }

// // Função para carregar todas as imagens
// function load() {
//     carregarSprites();

// }

// // Função genérica para carregar imagens
// function carregarSprites() {
//     for (let i = 0; i < run.length; i++) {
//         let sprite = new Image();
//         sprite.addEventListener("load", loadedRun, false);
//         sprite.src = "assets/dino/" + run[i];
//         console.log(sprite.src);
//     }
    
//     for (let i = 0; i < jump.length; i++) {
//         let sprite = new Image();
//         sprite.addEventListener("load", loadedJump, false);
//         sprite.src = "assets/dino/" + jump[i];
//         console.log(sprite.src);
//     }
// }

// // Funções chamadas ao carregar cada estado
// function loadedRun(e) { estados.RUN.push(e.currentTarget); loaded(); }
// function loadedJump(e) { estados.JUMP.push(e.currentTarget); loaded(); }


// // Verifica se todas as imagens foram carregadas
// function loaded() {
//     loadedImages++;
//     if (loadedImages === (run.length + jump.length )){
//         setup();
//     }
// }

// // Configuração inicial do jogo
// function setup() {
//     frames = estados.RUN;
//     dino = frames[0];

//     document.getElementById("world").appendChild(dino);

//     window.addEventListener("keyup", trocaEstado, false);
  

//     startGame();
// }

// // Trocar estado com base nas teclas pressionadas
// function trocaEstado(e) {

//     switch (e.code) {
       
//         case 'ArrowRight':  // Correr 
//                 currentFrame = 0;
//                 frames = estados.RUN;
//                 vx = 30;
//         break;

//         case 'ArrowUp':  // Pular
//                 isJumping = true;
//                 currentFrame = 0;
//                 frames = estados.JUMP;
//                 vx = 30; 
//         break;
//     }
// }


// // Iniciar o loop do jogo
// function startGame() {
//     timeHandler = setInterval(CicloDeJogo, 1000 / 12);
// }

// // Atualiza o jogo a cada frame
// function CicloDeJogo() {
//     currentFrame = (++currentFrame) % frames.length;
//     console.log("Frame:", currentFrame);

//     document.getElementById("world").replaceChild(frames[currentFrame], dino);
//     dino = frames[currentFrame];

//     posX += vx;
//     dino.style.left = posX + "px";

//     if (posX > 1280) posX = -200;

   
// }