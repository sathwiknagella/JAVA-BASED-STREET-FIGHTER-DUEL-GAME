import {
	pollGamepads,
	registerGamepadEvents,
	registerKeyboardEvents,
} from './engine/InputHandler.js';

import { BattleScene } from './scenes/BattleScene.js';
import { getContext } from './utils/context.js';
import { matchManager, GameScreen } from './state/matchManager.js';
import { UIManager } from './ui/UIManager.js';

export class StreetFighterGame {
	context = getContext();

	frameTime = {
		previous: 0,
		secondsPassed: 0,
	};

	constructor() {
		this.scene = new BattleScene();
		this.ui = new UIManager(this);
		this.setupRoundCallback();
	}

	setupRoundCallback() {
		this.scene.onRoundComplete = (winnerIdx, p1Hp, p2Hp, timeRemaining) => {
			const result = matchManager.recordRoundEnd(winnerIdx, p1Hp, p2Hp, timeRemaining);
			if (result.isMatchWon) {
				matchManager.setScreen(GameScreen.STAGE_COMPLETE);
			} else if (result.isMatchLost) {
				matchManager.setScreen(GameScreen.DEFEAT);
			} else {
				matchManager.setScreen(GameScreen.ROUND_RESULT);
			}
			this.ui.render();
		};
	}

	startMatch() {
		this.setupRoundCallback();
		this.scene.resetRound();
	}

	nextRound() {
		this.setupRoundCallback();
		this.scene.resetRound();
	}

	nextStage() {
		this.setupRoundCallback();
		this.scene.resetRound();
	}

	// Main Game Loop
	frame(time) {
		window.requestAnimationFrame(this.frame.bind(this));

		this.frameTime = {
			secondsPassed: (time - this.frameTime.previous) / 1000,
			previous: time,
		};

		pollGamepads();

		if (matchManager.currentScreen === GameScreen.FIGHTING) {
			this.scene.update(this.frameTime, this.context);
		}
		this.scene.draw(this.context);
	}

	start() {
		registerKeyboardEvents();
		registerGamepadEvents();

		window.requestAnimationFrame(this.frame.bind(this));
	}
}
