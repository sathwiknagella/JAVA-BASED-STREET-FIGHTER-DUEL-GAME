import { StreetFighterGame } from './StreetFighterGame.js';

window.addEventListener('load', function () {
	const game = new StreetFighterGame();
	game.start();

	function unlockAudio() {
		const music = document.querySelector('audio#theme-ken');
		if (music && music.paused) {
			music.play().catch(() => {});
		}
		window.removeEventListener('click', unlockAudio);
		window.removeEventListener('keydown', unlockAudio);
		window.removeEventListener('touchstart', unlockAudio);
	}
	window.addEventListener('click', unlockAudio);
	window.addEventListener('keydown', unlockAudio);
	window.addEventListener('touchstart', unlockAudio);
});
