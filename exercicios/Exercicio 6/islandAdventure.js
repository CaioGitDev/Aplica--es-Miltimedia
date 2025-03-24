

//----------------------------------------------------------------------------
// custom functions
const createShipStatus = () => {

	const lastRow = 4


	return {
		row: 0,
		col: 0,
		food: 0,
		gold: 0,
		experience: 0
	}
}

/**
 * Reset stage
 * @returns {void}
 */
function resetStage() {
	stage.innerHTML = ''
}



window.addEventListener("load", init, false);


let stage;
let output;
//código dos personagens de jogo
const character = {
	WATER: 0,
	ISLAND: 1,
	PIRATE: 2,
	HOME: 3,
	SHIP: 4,
	MONSTER: 5
}

//Mapa do jogo (estáticos)
const map =
	[
		[0, 2, 0, 0, 0, 3],
		[0, 0, 0, 1, 0, 0],
		[0, 1, 0, 0, 0, 0],
		[0, 0, 0, 0, 2, 0],
		[0, 2, 0, 1, 0, 0],
		[0, 0, 0, 0, 0, 0]
	];

//mapa dos objetos de jogo (dinâmicos)
const gameObjects =
	[
		[0, 0, 0, 0, 0, 0],
		[0, 0, 5, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[4, 0, 0, 0, 0, 0]
	];



// sons de jogo
const sounds = {
	somDeFundo: "",
	fight: "",
	trade: "",
	monster: "",
	success: "",
	death: ""
}

//tamanho de cada celula
const SIZE = 64;

//numero de linhas e colunas do mapa
const ROWS = map.length;
const COLUMNS = map[0].length;

// definições iniciais do monstro e do navio
const ship = createShipStatus();

const monster = {
	row: 0,
	col: 0,
}

function init() {
	/*completar*/
	sounds.somDeFundo = document.querySelector("#somDeFundo");
	sounds.somDeFundo.volume = 0.2;
	sounds.fight = document.querySelector("#fight");
	sounds.trade = document.querySelector("#trade");
	sounds.monster = document.querySelector("#monster");
	sounds.success = document.querySelector("#success");
	sounds.death = document.querySelector("#death");

	stage = document.querySelector("#stage");
  output = document.querySelector("#output");
	// 1 - Configurar variaveis de jogo: Comida; ouro; experi�ncia

	// 2 - encontrar as posi��es do monstro e do navio nos mapas
	// 3 - desenhar/renderizar  o mapa de acordo com os mapas
	render()
	// 4 - adicionar um listener para o teclado
}

function findGameObjects() {
	/*completar*/
	// percorrer os mapas de modo a verificar as posi��es do monstro e do navio
	// guardar a informa��o nas variaveis shipRow/shipColumn e monsterRow/monsterColumn
}

//----------------------------------------------------------------------------

function render() {
	/*completar*/
	//desenha o mapa com base na informa��o dos arrays 2D

	// 1 - Fazer o reset � stage (limpar c�lulas antigas)
	resetStage();

	// 2 - Percorrer os mapas e criar celulas na stage de acordo com a informa��o de cada posi��o
	drawMap();
	
	drawShipAndMoster();

	//	 2.2 - adicionar a celula (img) � stage;



	// 	2.4 - fazer o mesmo para o caso do montro e do navio

	// 	2.5 - Calcular e definir a posi��o da celuna na stage 

	// 3 - Enviar mensagens para o jogador relativas ao in�cio de jogo e valores das vari�veis de jogo (ouro,comida, experi�ncia).
}

/**
 * draw map based on map array
 * @returns {void}
 */
function drawMap() {
	const {
		WATER,
		ISLAND,
		PIRATE,
		HOME
	} = character

	map.forEach((row, rowIndex) => {
		row.forEach((column, columnIndex) => {
			const cellImage = document.createElement('img');

			// 	2.1 - criar elementos HTML img e classifica-los como .cell
			cellImage.className = 'cell';

			// 	2.3 - modificar o atributo src da celula, de acordo com a informa��o do mapa (agua,ilha, pirata,etc...)
			switch (column) {
				case WATER:
					cellImage.src = "./images/water.png"
					break;
				case ISLAND:
					cellImage.src = "./images/island.png"
					break;
				case PIRATE:
					cellImage.src = "./images/pirate.png"
					break;
				case HOME:
					cellImage.src = "./images/home.png"
					break;
			
			}

			calculateCellPosition(columnIndex, rowIndex, cellImage);

			stage.appendChild(cellImage);
		})
	})
}

function drawShipAndMoster() {
	const {
		SHIP,
		MONSTER
	} = character

	gameObjects.forEach((row, rowIndex) => {
		row.forEach((column, columnIndex) => {
			const cellImage = document.createElement('img');

			// 	2.1 - criar elementos HTML img e classifica-los como .cell
			cellImage.className = 'cell';

			// 	2.3 - modificar o atributo src da celula, de acordo com a informa��o do mapa (agua,ilha, pirata,etc...)
			switch (column) {
				case SHIP:
					cellImage.src = "./images/ship.png"
					break;
				case MONSTER:
					cellImage.src = "./images/monster.png"
					break;
			}

			calculateCellPosition(columnIndex, rowIndex, cellImage);

			stage.appendChild(cellImage);
		})
	})

}



function calculateCellPosition(columnIndex, rowIndex, cellImage) {
	const x = columnIndex * SIZE;
	const y = rowIndex * SIZE;

	cellImage.style.left = x + 'px';
	cellImage.style.top = y + 'px';

	return cellImage;
}

//----------------------------------------------------------------------------

function keydownHandler(event) {
	/*completar*/
	// 1 - verificar a tecla pressionada 
	// 2 - mover a posi��o do navio consoante a tecla pressionada

	// 3 - determinar o tipo de celula onde se encontra agora o navio e tomar uma a��o: lutar, negociar, navegar, terminar o jogo

	// 4- mover o monstro

	// 5 - verificar se o monstro encontrou o navio: se sim, termina o jogo

	// 6 - diminuir a comida

	// 7 - verificar se ainda h� comida ou ouro. Sen�o houver, termina o jogo

	// 8 - Reedesenhar o jogo
}

//----------------------------------------------------------------------------

function endGame() {
	/*completar*/
	// 1 - verificar se se atingiu o objectivo (castelo)
	// 1.1 - se sim, calcular a pontua��o: comida +ouro + experiencia
	// 1.2 - se n�o, ent�o verificar se foi encontrou o monstro: enviar uma mensagem, e reproduzir o som do monstro e do 
	//         afundamento do navio
	// 1.3 - Se n�o, enviar mensagem com a causa da morte

	//Remove the keyboard listener to end the game
	window.removeEventListener("keydown", keydownHandler, false);
}

//----------------------------------------------------------------------------


function trade() {
	/*completar*/
	//1- Calcular a comida da ilha: experiencia + ouro
	//2- Calular o custo (n� aleat�rio)* comida da ilha
	//3- verificar se tem capacidade negocial (ouro suficiente) e comprar
	//4 - enviar mensagem
	sounds.trade.play();
}

//----------------------------------------------------------------------------

function fight() {
	/* completar*/
	/*luta aleat�ria e ganhos/perdas aleat�rias*/
	/*verificar se ganhou ou perdeu e atualizar as variaveis*/

	gameMessage
		= "You fight and WIN " + pirateGold + " gold pieces."
		+ " Ship's strength: " + shipStrength
		+ " Pirate's strength: " + pirateStrength;
	sounds.trade.play();


}

//----------------------------------------------------------------------------

function moveMonster() {
	/*completar*/
	//1 - Verificar os movimentos poss�veis e guardar num array
	//2 - gerar n�mero aleat�rio com o tamanho do array
	//3 - tomar o movimento gerado e mover o monstro no array
}


