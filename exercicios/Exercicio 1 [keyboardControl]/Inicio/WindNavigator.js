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

	let gameOptions = {
		fps: 1000 / 30, // 24 frames por segundo
		keys: {}
	}

	let timeHandler;

	window.addEventListener("load", init, false);

	function init(e) {

		timeHandler = setInterval(gameCicle, gameOptions.fps)

		// iniciar aqui
		window.addEventListener('keydown', keyDown, false);
		window.addEventListener('keyup', keyUp, false);
	}

	function controlInputs() {

		const { keys } = gameOptions;
    const { pos, speed } = Baloon;

    if (keys['ArrowLeft']) pos.x -= speed;
    if (keys['ArrowRight']) pos.x += speed;
    if (keys['ArrowUp']) pos.y -= speed;
    if (keys['ArrowDown']) pos.y += speed;

    if (keys['Space']) {
        changeSpeed();
    }

	}

	const keyDown = (event) => {
		gameOptions.keys[event.code] = true;
	}

	const keyUp = (event) => {
		gameOptions.keys[event.code] = false;
	}

	function gameCicle() {
		controlInputs();
		Baloon.update();
		updatePanel();
	}

	function updatePanel() {
		updateHUD("mvelocidade", Baloon.speed);
		updateHUD("maltitude", calculateAltitude());
	}

	function changeSpeed(){
		const { speed } = Baloon
		if(speed < 3)
			speed++;
		else
			speed = 1;
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




