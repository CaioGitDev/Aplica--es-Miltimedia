

//----------------------------------------------------------------------------
// custom functions

/**
 * Create a ship status based on random values, this function can generate ship status based on dificulty multiplier
 * easy: 1
 * normal: 2
 * hard: 3
 * @param {number} dificulty - dificulty multiplier
 * @returns {Object} - ship status
*/
const createShipStatus = (dificulty) => {

	const dificultyMultiplier = dificulty || 1;

	const shipStatus = {
		row: 0,
		col: 0,
		food: Math.floor(Math.random() * 100) * dificultyMultiplier,
		gold: Math.floor(Math.random() * 100) * dificultyMultiplier,
		experience: Math.floor(Math.random() * 100) * dificultyMultiplier
	}

	return shipStatus;
}

/**
 * Reset stage
 * @returns {void}
 */
function resetStage() {
	stage.innerHTML = ''
}



window.addEventListener("load", init, false);

let gameMessage = "Island Adventure!";
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
let ship = createShipStatus(dificulty = 2);
let monster = {
	row: 0,
	col: 0,
}

function init() {
	/*completar*/
	initSounds();

	stage = document.querySelector("#stage");
  output = document.querySelector("#output");
	// 1 - Configurar variaveis de jogo: Comida; ouro; experi�ncia

	// 2 - encontrar as posi��es do monstro e do navio nos mapas
	findGameObjects();
	// 3 - desenhar/renderizar  o mapa de acordo com os mapas
	render()
	// 4 - adicionar um listener para o teclado
	window.addEventListener("keydown", keydownHandler, false);


}

/**
 * find the position of the ship and monster in the gameObjects array
 * update ship  and moster position
 * @returns {void}
 */
function findGameObjects() {
	/*completar*/
	// percorrer os mapas de modo a verificar as posissoes do monstro e do navio
	gameObjects.forEach((row, rowIndex) => {
		row.forEach((column, columnIndex) => {
			if (column === character.SHIP) {
				ship.row = rowIndex;
				ship.col = columnIndex;
			}

			if (column === character.MONSTER) {
				monster.row = rowIndex;
				monster.col = columnIndex;
			}
		})
	})

	// guardar a informa��o nas variaveis shipRow/shipColumn e monsterRow/monsterColumn
}

function initSounds() {
	sounds.somDeFundo = document.querySelector("#somDeFundo");
	sounds.somDeFundo.volume = 0.2;
	sounds.fight = document.querySelector("#fight");
	sounds.trade = document.querySelector("#trade");
	sounds.monster = document.querySelector("#monster");
	sounds.success = document.querySelector("#success");
	sounds.death = document.querySelector("#death");
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

	// 3 - Enviar mensagens para o jogador relativas ao in�cio de jogo e valores das vari�veis de jogo (ouro,comida, experi�ncia).
	showHUD();
}


/**
 * show HUD - show the status of the ship 
 * has 2 columns one for show messagens and other to show the status of the ship
 * @returns {void}
 */
function showHUD(message) {
	// clear the output div
	output.innerHTML = '';

	const shipStatus = document.createElement('div');
	shipStatus.className = 'shipStatus';
	shipStatus.innerHTML = `
	<div class="ship-column">
			<p>Ship Status</p>
			<p>Food: ${ship.food}</p>
			<p>Gold: ${ship.gold}</p>
			<p>Experience: ${ship.experience}</p>
		</div>
		<div class="ship-column">
			<p>Game Messages</p>
			<span style="white-space: pre-wrap;">${gameMessage}</span>
		</div>
		
	`;

	output.appendChild(shipStatus);
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

/**
 * draw ship and monster based on gameObjects array
 * @returns {void}
 */
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


/**
 *  calculate the position of the cell
 * @param {number} columnIndex - numero da coluna
 * @param {number} rowIndex  - numero da linha
 * @param {HTMLImageElement} cellImage - imagem da celula
 * @returns {HTMLImageElement}
 */
function calculateCellPosition(columnIndex, rowIndex, cellImage) {
	const x = columnIndex * SIZE;
	const y = rowIndex * SIZE;

	cellImage.style.left = x + 'px';
	cellImage.style.top = y + 'px';

	return cellImage;
}

//----------------------------------------------------------------------------

function keydownHandler(event) {
	console.log(event)
	/*completar*/
	// 1 - verificar a tecla pressionada 
	const keysMap = {
		left: 'ArrowLeft',
		up: 'ArrowUp',
		right: 'ArrowRight',
		down: 'ArrowDown'
	}

	// disabled other keys
	if (Object.values(keysMap).indexOf(event.key) === -1)
		return;

	// use arrows to move the ship
	if (event.key === keysMap.left) {
		moveShip('left');
	}
	if (event.key === keysMap.up) {
		moveShip('up');
	}
	if (event.key === keysMap.right) {
		moveShip('right');
	}
	if(event.key === keysMap.down){
		moveShip('down');
	}

	// 2 - mover a posi��o do navio consoante a tecla pressionada

	// 3 - determinar o tipo de celula onde se encontra agora o navio e tomar uma a��o: lutar, negociar, navegar, terminar o jogo

	// 4- mover o monstro
	moveMonster();

	// 5 - verificar se o monstro encontrou o navio: se sim, termina o jogo

	// 6 - diminuir a comida

	// 7 - verificar se ainda h� comida ou ouro. Sen�o houver, termina o jogo

	// 8 - Reedesenhar o jogo
	render();
}

/**
 * Iterate over the map and execute a callback for each cell
 * @param {Array} map - The 2D map array
 * @param {Function} callback - The function to execute for each cell
 */
function iterateMap(map, callback) {
  map.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      callback(row, column, rowIndex, columnIndex);
    });
  });
}

/**
 * Move ship based on direction, and check if the position is valid
 * @param {string} direction 
 */
function moveShip(direction){
	const shipRow = ship.row;
  const shipColumn = ship.col;

  iterateMap(map, (row, column, rowIndex, columnIndex) => {
    if (rowIndex === shipRow && columnIndex === shipColumn) {
      switch (direction) {
        case 'left':
          if (columnIndex - 1 >= 0) {
            ship.col = columnIndex - 1;
          }
          break;
        case 'up':
          if (rowIndex - 1 >= 0) {
            ship.row = rowIndex - 1;
          }
          break;
        case 'right':
          if (columnIndex + 1 < COLUMNS) {
            ship.col = columnIndex + 1;
          }
          break;
        case 'down':
          if (rowIndex + 1 < ROWS) {
            ship.row = rowIndex + 1;
          }
          break;
      }
    }
  });

	// set new position of the ship on gameObjects array
	gameObjects[shipRow][shipColumn] = 0;
	gameObjects[ship.row][ship.col] = 4;

	// 2 - check water possition and decrease food
	if(map[ship.row][ship.col] === character.WATER){
		ship.food -= 10;
		gameMessage = "You are in the water. Food -10";
		showHUD();
	}


	// 3 - verificar se a posi��o � ilha
	if(map[ship.row][ship.col] === character.ISLAND){
		trade();
	}
	// 4 - verificar se a posi��o � casa
	if(map[ship.row][ship.col] === character.HOME){
		endGame();
	}
	// 5 - verificar se a posi��o � pirata
	if(map[ship.row][ship.col] === character.PIRATE){
		fight();
	}
	
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
	const shipGold = ship.gold;
	const shipStrength = ship.food + ship.experience;

	const pirateGold = Math.floor(Math.random() * 100);
	const pirateStrength = Math.floor(Math.random() * 100);

	const result = shipStrength > pirateStrength
	if(result){
		ship.gold += pirateGold;
		ship.experience += 10;

		// remove monkey from map
		map[ship.row][ship.col] = 0;
	}
	else{
		ship.gold -= pirateGold;
		
	}

	/*verificar se ganhou ou perdeu e atualizar as variaveis*/

	gameMessage = `
You figth and ${result ? "WIN": "Lose"} ${pirateGold} gold pieces.
Ship's strength: ${shipStrength}
Pirate's strength: ${pirateStrength}
	`
	sounds.trade.play();
}

//----------------------------------------------------------------------------

function moveMonster() {
	/*completar*/
	const possibleDirections = ["up", "down", "left", "right"]
	const move = Math.floor(Math.random() * possibleDirections.length) +1;
	const monsterRow = monster.row;
	const monsterColumn = monster.col;

	console.log(move)
	//1 - Verificar os movimentos poss�veis e guardar num array
	iterateMap(map, (row, column, rowIndex, columnIndex) => {
		// check posible directions available for the monster, monster can only move on water
		if (rowIndex === monsterRow && columnIndex === monsterColumn) {
			switch (move) {
				case 1:
					// if column is greater than 0 and the cell is water
					if (columnIndex - 1 >= 0 && map[rowIndex][columnIndex - 1] === character.WATER) {
						monster.col = columnIndex - 1;
					}
					break;
				case 2:
					if (rowIndex - 1 >= 0 && map[rowIndex - 1][columnIndex] === character.WATER) {
						monster.row = rowIndex - 1;
					}
					break;
				case 3:
					if (columnIndex + 1 < COLUMNS && map[rowIndex][columnIndex + 1] === character.WATER) {
						monster.col = columnIndex + 1;
					}
					break;
				case 4:
					if (rowIndex + 1 < ROWS && map[rowIndex + 1][columnIndex] === character.WATER) {
						monster.row = rowIndex + 1;
					}
					break;
			}
		}
	})

	// set new position of the monster on gameObjects array
	gameObjects[monsterRow][monsterColumn] = 0;
	gameObjects[monster.row][monster.col] = 5;

	//2 - gerar n�mero aleat�rio com o tamanho do array
	//3 - tomar o movimento gerado e mover o monstro no array
}


