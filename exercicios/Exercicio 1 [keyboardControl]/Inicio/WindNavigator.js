(function () {

	const speedElement = document.getElementById('mvelocidade');
	const altitude = document.getElementById('maltitude');

	const Baloon = {
		pos: {
			x: 250,
			y: 150
		},
		width: 142,
		speed: 3,
		update() {
			let sprintBaloon = document.getElementById('ship');
			sprintBaloon.style.left = this.pos.x;
			sprintBaloon.style.top = this.pos.y;
			sprintBaloon.style.width = this.width + "px",
				sprintBaloon.style.height = "auto"
		}
	}

	const gameOptions = {
		fps: 1000 / 30, // 24 frames por segundo
		keys: {}
	}

	let timeHandler;

	window.addEventListener("load", init, false);

	function init(e) {

		timeHandler = setInterval(gameCicle, gameOptions.fps)

		// iniciar aqui
		window.addEventListener('keydown', (e) => toogleKeyPressStatus(e, true), false);
		window.addEventListener('keyup', (e) => toogleKeyPressStatus(e, false), false);
	}

	function controlInputs() {

		const { keys } = gameOptions;
		const { pos, speed  } = Baloon;
		let { width } = Baloon;

		if(keys['ArrowLeft'] && keys['ArrowRight']) {
			pos.x -= speed;
			pos.x += speed;
		}else if (keys['ArrowUp'] && keys['ArrowDown']) {
			pos.y -= speed;
			pos.y += speed;
		} else if(keys['ArrowRight'] && keys['ArrowUp']) {
			pos.x += speed;
			pos.y -= speed;
		}
		else if(keys['ArrowRight'] && keys['ArrowDown']) {
			pos.x += speed;
			pos.y += speed
		}
		else if(keys['ArrowLeft'] && keys['ArrowUp']) {
			pos.x -= speed;
			pos.y -= speed;
		} else if(keys['ArrowLeft'] && keys['ArrowDown']) {
			pos.x -= speed;
			pos.y += speed;
		}
		else if (keys['ArrowLeft']) pos.x -= speed;
		else if (keys['ArrowRight']) pos.x += speed;
		else if (keys['ArrowUp']) pos.y -= speed;
		else if (keys['ArrowDown']) pos.y += speed;


		if (keys['Space']) {
			changeSpeed('increase');
		}
		if (keys['ShiftLeft']) {
			keys['ShiftLeft'] = false;
			changeSpeed('decrease');
		}

		if(keys['KeyQ']){
			Baloon.width -= Baloon.width > 5 ? 0.5 : 0;
		}

		if(keys['KeyE']){
			Baloon.width += Baloon.width < 200 ? 0.5 : 0;
		}

	}

	function toogleKeyPressStatus(event, isKeyPress) {
		gameOptions.keys[event.code] = isKeyPress;
	}

	function gameCicle() {
		controlInputs();
		Baloon.update();
		updatePanel();
	}

	function updatePanel() {
		updateHUD("mvelocidade", `${Baloon.speed} km/h`);
		updateHUD("maltitude", `${calculateAltitude()} m`);
	}

	function changeSpeed(action) {
		const speed = Baloon.speed;
		switch (action) {
			case 'increase':
				Baloon.speed = speed + 1;
				break;
			case 'decrease':
				Baloon.speed = speed - 1;
				break;
			default:
				break;
		}

		checkSpeedLimit();
	}

	function checkSpeedLimit() {
		if (Baloon.speed > 10) {
			Baloon.speed = 10;
		} else if (Baloon.speed < 1) {
			Baloon.speed = 1;
		}
	}

	function calculateAltitude() {
		return window.innerHeight - Baloon.pos.y;
	}

	function updateHUD(elementId, text) {
		document.getElementById(elementId).innerHTML = text;
	}

	function stop() {
		clearInterval(timeHandler)
	}

})();




