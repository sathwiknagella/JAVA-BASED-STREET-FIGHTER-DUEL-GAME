import { Control } from '../constants/control.js';
import { FighterState } from '../constants/fighter.js';

export class CpuController {
    active = false;
    currentAction = 'IDLE';
    actionTimer = 0;
    actionDuration = 0;

    activeControls = {
        left: false,
        right: false,
        up: false,
        down: false,
        buttons: new Set(),
    };

    pressedQueue = new Set();

    update(time, p1, p2, difficulty = 'MEDIUM') {
        if (!this.active || !p1 || !p2) return;

        // Clear one-shot presses from previous frame
        this.pressedQueue.clear();

        const dx = p1.position.x - p2.position.x;
        const dist = Math.abs(dx);
        const p1ToRight = dx > 0;

        // Config per difficulty
        let decisionInterval = 600;
        let attackRate = 0.5;
        let aggression = 0.5;

        if (difficulty === 'EASY') {
            decisionInterval = 900 + Math.random() * 600;
            attackRate = 0.25;
            aggression = 0.3;
        } else if (difficulty === 'HARD') {
            decisionInterval = 180 + Math.random() * 200;
            attackRate = 0.85;
            aggression = 0.85;
        } else {
            // MEDIUM
            decisionInterval = 400 + Math.random() * 400;
            attackRate = 0.55;
            aggression = 0.55;
        }

        if (time.previous > this.actionTimer + this.actionDuration) {
            this.actionTimer = time.previous;
            this.actionDuration = decisionInterval;

            // Reset continuous moves
            this.activeControls.left = false;
            this.activeControls.right = false;
            this.activeControls.up = false;
            this.activeControls.down = false;

            const roll = Math.random();

            if (dist > 80) {
                // Advance toward P1
                if (roll < aggression) {
                    if (p1ToRight) this.activeControls.right = true;
                    else this.activeControls.left = true;

                    // Chance to jump forward
                    if (Math.random() < 0.2) {
                        this.activeControls.up = true;
                    }
                } else if (roll < aggression + 0.2) {
                    // Hesitate or throw fireball if far
                    if (dist > 110 && difficulty !== 'EASY') {
                        this.pressedQueue.add(Control.HEAVY_PUNCH);
                    }
                } else {
                    // Idle / Back off slightly
                    if (p1ToRight) this.activeControls.left = true;
                    else this.activeControls.right = true;
                }
            } else {
                // In close melee range
                if (roll < attackRate) {
                    // Attack
                    const attackChoices = [
                        Control.LIGHT_PUNCH,
                        Control.MEDIUM_PUNCH,
                        Control.HEAVY_PUNCH,
                        Control.LIGHT_KICK,
                        Control.MEDIUM_KICK,
                        Control.HEAVY_KICK,
                    ];
                    const choice = attackChoices[Math.floor(Math.random() * attackChoices.length)];
                    this.pressedQueue.add(choice);

                    // Chance to crouch attack
                    if (Math.random() < 0.4) {
                        this.activeControls.down = true;
                    }
                } else if (roll < attackRate + 0.25) {
                    // Back step / block
                    if (p1ToRight) this.activeControls.left = true;
                    else this.activeControls.right = true;
                } else {
                    // Jump attack
                    this.activeControls.up = true;
                    if (p1ToRight) this.activeControls.right = true;
                    else this.activeControls.left = true;
                    this.pressedQueue.add(Control.HEAVY_KICK);
                }
            }
        }
    }

    isLeft() {
        return this.active && this.activeControls.left;
    }

    isRight() {
        return this.active && this.activeControls.right;
    }

    isUp() {
        return this.active && this.activeControls.up;
    }

    isDown() {
        return this.active && this.activeControls.down;
    }

    isControlPressed(control) {
        if (!this.active) return false;
        return this.pressedQueue.has(control);
    }
}

export const cpuController = new CpuController();
