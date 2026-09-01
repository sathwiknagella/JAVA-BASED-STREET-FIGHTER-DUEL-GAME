import { Control, GamepadThumbstick } from '../constants/control.js';

export const controls = [
    // Player 1 (Story Hero / Primary)
    {
        gamePad: {
            [GamepadThumbstick.DEAD_ZONE]: 0.5,
            [GamepadThumbstick.HORIZONTAL_AXE_ID]: 0,
            [GamepadThumbstick.VERTICAL_AXE_ID]: 1,

            [Control.LEFT]: 14,
            [Control.RIGHT]: 15,
            [Control.UP]: 12,
            [Control.DOWN]: 13,
            [Control.LIGHT_PUNCH]: 2,
            [Control.MEDIUM_PUNCH]: 3,
            [Control.HEAVY_PUNCH]: 5,
            [Control.LIGHT_KICK]: 0,
            [Control.MEDIUM_KICK]: 1,
            [Control.HEAVY_KICK]: 7,
        },
        keyboard: {
            // Movement: WASD + Arrow Keys + Legacy (Z, C, X)
            [Control.LEFT]: ['KeyA', 'ArrowLeft', 'KeyZ'],
            [Control.RIGHT]: ['KeyD', 'ArrowRight', 'KeyC'],
            [Control.UP]: ['KeyW', 'ArrowUp'],
            [Control.DOWN]: ['KeyS', 'ArrowDown', 'KeyX'],

            // Punches: (J, K, L) or (U, I, O) or (1, 2, 3)
            [Control.LIGHT_PUNCH]: ['KeyJ', 'KeyU', 'Digit1'],
            [Control.MEDIUM_PUNCH]: ['KeyK', 'KeyI', 'Digit2'],
            [Control.HEAVY_PUNCH]: ['KeyL', 'KeyO', 'Digit3'],

            // Kicks: (B, N, M) or (Q, E, R) or (4, 5, 6)
            [Control.LIGHT_KICK]: ['KeyB', 'KeyQ', 'Digit4'],
            [Control.MEDIUM_KICK]: ['KeyN', 'KeyE', 'Digit5'],
            [Control.HEAVY_KICK]: ['KeyM', 'KeyR', 'Digit6'],
        },
    },
    // Player 2 / Human Opponent
    {
        gamePad: {
            [GamepadThumbstick.DEAD_ZONE]: 0.5,
            [GamepadThumbstick.HORIZONTAL_AXE_ID]: 0,
            [GamepadThumbstick.VERTICAL_AXE_ID]: 1,

            [Control.LEFT]: 14,
            [Control.RIGHT]: 15,
            [Control.UP]: 12,
            [Control.DOWN]: 13,
            [Control.LIGHT_PUNCH]: 2,
            [Control.MEDIUM_PUNCH]: 3,
            [Control.HEAVY_PUNCH]: 5,
            [Control.LIGHT_KICK]: 0,
            [Control.MEDIUM_KICK]: 1,
            [Control.HEAVY_KICK]: 7,
        },
        keyboard: {
            [Control.LEFT]: ['Numpad4'],
            [Control.RIGHT]: ['Numpad6'],
            [Control.UP]: ['Numpad8'],
            [Control.DOWN]: ['Numpad5', 'Numpad2'],
            [Control.LIGHT_PUNCH]: ['Digit8', 'Numpad7'],
            [Control.MEDIUM_PUNCH]: ['Digit9', 'Numpad9'],
            [Control.HEAVY_PUNCH]: ['Digit0', 'NumpadAdd'],
            [Control.LIGHT_KICK]: ['KeyY', 'Numpad1'],
            [Control.MEDIUM_KICK]: ['KeyH', 'Numpad3'],
            [Control.HEAVY_KICK]: ['KeyP', 'NumpadEnter'],
        },
    },
];
