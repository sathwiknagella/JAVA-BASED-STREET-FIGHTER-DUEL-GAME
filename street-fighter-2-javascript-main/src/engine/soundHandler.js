import { matchManager } from '../state/matchManager.js';

export function playSound(sound, volume = 1) {
	if (!sound) return;
	const isMusic = sound.id === 'theme-ken';
	if (isMusic && !matchManager.settings.music) return;
	if (!isMusic && !matchManager.settings.sound) return;

	sound.volume = volume * (matchManager.settings.volume ?? 1);

	if (!sound.paused && sound.currentTime > 0) {
		sound.currentTime = 0;
	} else {
		const playPromise = sound.play();
		if (playPromise !== undefined) {
			playPromise.catch(() => {});
		}
	}
}

export function stopSound(sound) {
	if (!sound) return;
	sound.pause();
	sound.currentTime = 0;
}
