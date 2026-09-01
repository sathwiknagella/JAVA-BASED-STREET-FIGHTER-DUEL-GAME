import { FighterId } from '../constants/fighter.js';
import { createDefaultFighterState } from './fighterState.js';

export const gameState = {
	fighters: [
		createDefaultFighterState(FighterId.RYU),
		createDefaultFighterState(FighterId.KEN),
	],
	resetFighterStates(p1Id = FighterId.RYU, p2Id = FighterId.KEN) {
		this.fighters = [
			createDefaultFighterState(p1Id),
			createDefaultFighterState(p2Id),
		];
	},
};
