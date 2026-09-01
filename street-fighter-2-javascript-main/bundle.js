(() => {
  // src/constants/control.js
  var GamepadThumbstick = {
    DEAD_ZONE: "deadZone",
    HORIZONTAL_AXE_ID: "horizontalAxeId",
    VERTICAL_AXE_ID: "verticalAxeId"
  };
  var Control = {
    // Movement
    LEFT: "left",
    RIGHT: "right",
    UP: "up",
    DOWN: "down",
    // Basic Attacks
    LIGHT_PUNCH: "lightPunch",
    MEDIUM_PUNCH: "mediumPunch",
    HEAVY_PUNCH: "heavyPunch",
    LIGHT_KICK: "lightKick",
    MEDIUM_KICK: "mediumKick",
    HEAVY_KICK: "heavyKick"
  };

  // src/config/controls.js
  var controls = [
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
        [Control.HEAVY_KICK]: 7
      },
      keyboard: {
        // Movement: WASD + Arrow Keys + Legacy (Z, C, X)
        [Control.LEFT]: ["KeyA", "ArrowLeft", "KeyZ"],
        [Control.RIGHT]: ["KeyD", "ArrowRight", "KeyC"],
        [Control.UP]: ["KeyW", "ArrowUp"],
        [Control.DOWN]: ["KeyS", "ArrowDown", "KeyX"],
        // Punches: (J, K, L) or (U, I, O) or (1, 2, 3)
        [Control.LIGHT_PUNCH]: ["KeyJ", "KeyU", "Digit1"],
        [Control.MEDIUM_PUNCH]: ["KeyK", "KeyI", "Digit2"],
        [Control.HEAVY_PUNCH]: ["KeyL", "KeyO", "Digit3"],
        // Kicks: (B, N, M) or (Q, E, R) or (4, 5, 6)
        [Control.LIGHT_KICK]: ["KeyB", "KeyQ", "Digit4"],
        [Control.MEDIUM_KICK]: ["KeyN", "KeyE", "Digit5"],
        [Control.HEAVY_KICK]: ["KeyM", "KeyR", "Digit6"]
      }
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
        [Control.HEAVY_KICK]: 7
      },
      keyboard: {
        [Control.LEFT]: ["Numpad4"],
        [Control.RIGHT]: ["Numpad6"],
        [Control.UP]: ["Numpad8"],
        [Control.DOWN]: ["Numpad5", "Numpad2"],
        [Control.LIGHT_PUNCH]: ["Digit8", "Numpad7"],
        [Control.MEDIUM_PUNCH]: ["Digit9", "Numpad9"],
        [Control.HEAVY_PUNCH]: ["Digit0", "NumpadAdd"],
        [Control.LIGHT_KICK]: ["KeyY", "Numpad1"],
        [Control.MEDIUM_KICK]: ["KeyH", "Numpad3"],
        [Control.HEAVY_KICK]: ["KeyP", "NumpadEnter"]
      }
    }
  ];

  // src/constants/game.js
  var ENABLE_DEBUG = false;
  var FPS = 60;
  var FRAME_TIME = 1e3 / 60;
  var SCREEN_WIDTH = 384;
  var SCREEN_HEIGHT = 224;

  // src/constants/fighter.js
  var PUSH_FRICTION = 66;
  var FIGHTER_START_DISTANCE = 88;
  var FIGHTER_HURT_DELAY = 7 + 8;
  var FighterDirection = {
    LEFT: -1,
    RIGHT: 1
  };
  var FighterId = {
    RYU: "Ryu",
    KEN: "Ken"
  };
  var FighterAttackType = {
    PUNCH: "punch",
    KICK: "kick"
  };
  var FighterAttackStrength = {
    LIGHT: "light",
    MEDIUM: "medium",
    HEAVY: "heavy"
  };
  var FighterHurtBox = {
    HEAD: "head",
    BODY: "body",
    FEET: "feet"
  };
  var FighterHurtBy = {
    FIGHTER: "fighter",
    FIREBALL: "fireball"
  };
  var FighterAttackBaseData = {
    [FighterAttackStrength.LIGHT]: {
      score: 100,
      damage: 12,
      slide: {
        velocity: -10 * FRAME_TIME,
        friction: 600
      }
    },
    [FighterAttackStrength.MEDIUM]: {
      score: 300,
      damage: 20,
      slide: {
        velocity: -12 * FRAME_TIME,
        friction: 600
      }
    },
    [FighterAttackStrength.HEAVY]: {
      score: 500,
      damage: 28,
      slide: {
        velocity: -16 * FRAME_TIME,
        friction: 800
      }
    }
  };
  var FighterState = {
    IDLE: "idle",
    WALK_FORWARD: "walk-forwards",
    WALK_BACKWARD: "walk-backwards",
    JUMP_START: "jump-start",
    JUMP_UP: "jump-up",
    JUMP_FORWARD: "jump-forwards",
    JUMP_BACKWARD: "jump-backwards",
    JUMP_LAND: "jump-land",
    CROUCH: "crouch",
    CROUCH_DOWN: "crouch-down",
    CROUCH_UP: "crouch-up",
    IDLE_TURN: "idle-turn",
    CROUCH_TURN: "crouch-turn",
    LIGHT_PUNCH: "light-punch",
    MEDIUM_PUNCH: "medium-punch",
    HEAVY_PUNCH: "heavy-punch",
    LIGHT_KICK: "light-kick",
    MEDIUM_KICK: "medium-kick",
    HEAVY_KICK: "heavy-kick",
    HURT_HEAD_LIGHT: "hurt-head-light",
    HURT_HEAD_MEDIUM: "hurt-head-medium",
    HURT_HEAD_HEAVY: "hurt-head-heavy",
    HURT_BODY_LIGHT: "hurt-body-light",
    HURT_BODY_MEDIUM: "hurt-body-medium",
    HURT_BODY_HEAVY: "hurt-body-heavy",
    SPECIAL_1: "special-1",
    WINNER_POSE: "winner-pose"
  };
  var FrameDelay = {
    FREEZE: 0,
    TRANSITION: -1
  };
  var PushBox = {
    IDLE: [-16, -80, 32, 78],
    JUMP: [-16, -91, 32, 66],
    BEND: [-16, -58, 32, 58],
    CROUCH: [-16, -50, 32, 50]
  };
  var HurtBox = {
    IDLE: [
      [-8, -88, 24, 16],
      [-26, -74, 40, 42],
      [-26, -31, 40, 32]
    ],
    BACKWARD: [
      [-19, -88, 24, 16],
      [-26, -74, 40, 42],
      [-26, -31, 40, 32]
    ],
    FORWARD: [
      [-3, -88, 24, 16],
      [-26, -74, 40, 42],
      [-26, -31, 40, 32]
    ],
    JUMP: [
      [-13, -106, 28, 18],
      [-26, -90, 40, 42],
      [-22, -66, 38, 18]
    ],
    BEND: [
      [-2, -68, 24, 18],
      [-16, -53, 44, 24],
      [-16, -24, 44, 24]
    ],
    CROUCH: [
      [6, -61, 24, 18],
      [-16, -46, 44, 24],
      [-16, -24, 44, 24]
    ],
    PUNCH: [
      [11, -94, 24, 18],
      [-7, -77, 40, 43],
      [-7, -33, 40, 33]
    ]
  };
  var HurtStateValidFrom = [
    FighterState.IDLE,
    FighterState.WALK_BACKWARD,
    FighterState.WALK_FORWARD,
    FighterState.JUMP_LAND,
    FighterState.JUMP_START,
    FighterState.JUMP_UP,
    FighterState.IDLE_TURN,
    FighterState.LIGHT_PUNCH,
    FighterState.MEDIUM_PUNCH,
    FighterState.HEAVY_PUNCH,
    FighterState.LIGHT_KICK,
    FighterState.MEDIUM_KICK,
    FighterState.HEAVY_KICK,
    FighterState.HURT_HEAD_LIGHT,
    FighterState.HURT_HEAD_MEDIUM,
    FighterState.HURT_HEAD_HEAVY,
    FighterState.HURT_BODY_LIGHT,
    FighterState.HURT_BODY_MEDIUM,
    FighterState.HURT_BODY_HEAVY,
    FighterState.SPECIAL_1
  ];
  var SpecialMoveDirection = {
    BACKWARD: "backward",
    BACKWARD_UP: "backward-up",
    UP: "up",
    FORWARD_UP: "forward-up",
    FORWARD: "forward",
    FORWARD_DOWN: "forward-down",
    DOWN: "down",
    BACKWARD_DOWN: "backward-down",
    NONE: "none"
  };
  var SpecialMoveButton = {
    ANY_PUNCH: "any-punch",
    ANY_KICK: "any-kick"
  };

  // src/engine/CpuController.js
  var CpuController = class {
    active = false;
    currentAction = "IDLE";
    actionTimer = 0;
    actionDuration = 0;
    activeControls = {
      left: false,
      right: false,
      up: false,
      down: false,
      buttons: /* @__PURE__ */ new Set()
    };
    pressedQueue = /* @__PURE__ */ new Set();
    update(time, p1, p2, difficulty = "MEDIUM") {
      if (!this.active || !p1 || !p2) return;
      this.pressedQueue.clear();
      const dx = p1.position.x - p2.position.x;
      const dist = Math.abs(dx);
      const p1ToRight = dx > 0;
      let decisionInterval = 600;
      let attackRate = 0.5;
      let aggression = 0.5;
      if (difficulty === "EASY") {
        decisionInterval = 900 + Math.random() * 600;
        attackRate = 0.25;
        aggression = 0.3;
      } else if (difficulty === "HARD") {
        decisionInterval = 180 + Math.random() * 200;
        attackRate = 0.85;
        aggression = 0.85;
      } else {
        decisionInterval = 400 + Math.random() * 400;
        attackRate = 0.55;
        aggression = 0.55;
      }
      if (time.previous > this.actionTimer + this.actionDuration) {
        this.actionTimer = time.previous;
        this.actionDuration = decisionInterval;
        this.activeControls.left = false;
        this.activeControls.right = false;
        this.activeControls.up = false;
        this.activeControls.down = false;
        const roll = Math.random();
        if (dist > 80) {
          if (roll < aggression) {
            if (p1ToRight) this.activeControls.right = true;
            else this.activeControls.left = true;
            if (Math.random() < 0.2) {
              this.activeControls.up = true;
            }
          } else if (roll < aggression + 0.2) {
            if (dist > 110 && difficulty !== "EASY") {
              this.pressedQueue.add(Control.HEAVY_PUNCH);
            }
          } else {
            if (p1ToRight) this.activeControls.left = true;
            else this.activeControls.right = true;
          }
        } else {
          if (roll < attackRate) {
            const attackChoices = [
              Control.LIGHT_PUNCH,
              Control.MEDIUM_PUNCH,
              Control.HEAVY_PUNCH,
              Control.LIGHT_KICK,
              Control.MEDIUM_KICK,
              Control.HEAVY_KICK
            ];
            const choice = attackChoices[Math.floor(Math.random() * attackChoices.length)];
            this.pressedQueue.add(choice);
            if (Math.random() < 0.4) {
              this.activeControls.down = true;
            }
          } else if (roll < attackRate + 0.25) {
            if (p1ToRight) this.activeControls.left = true;
            else this.activeControls.right = true;
          } else {
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
  };
  var cpuController = new CpuController();

  // src/engine/InputHandler.js
  var heldKeys = /* @__PURE__ */ new Set();
  var pressedKeys = /* @__PURE__ */ new Set();
  var gamePads = /* @__PURE__ */ new Map();
  var pressedButtons = /* @__PURE__ */ new Set();
  var mappedKeys = controls.map(({ keyboard }) => Object.values(keyboard)).flat(Infinity);
  function handleKeyDown(event) {
    if (!mappedKeys.includes(event.code)) return;
    event.preventDefault();
    heldKeys.add(event.code);
  }
  function handleKeyUp(event) {
    if (!mappedKeys.includes(event.code)) return;
    event.preventDefault();
    heldKeys.delete(event.code);
    pressedKeys.delete(event.code);
  }
  function handleGamepadConnected(event) {
    const {
      gamepad: { index, axes, buttons }
    } = event;
    gamePads.set(index, { axes, buttons });
  }
  function handleGamepadDisconnected(event) {
    const {
      gamepad: { index }
    } = event;
    gamePads.delete(index);
  }
  function registerKeyboardEvents() {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
  }
  function registerGamepadEvents() {
    window.addEventListener("gamepadconnected", handleGamepadConnected);
    window.addEventListener("gamepaddisconnected", handleGamepadDisconnected);
  }
  function pollGamepads() {
    for (const gamePad of navigator.getGamepads()) {
      if (!gamePad) continue;
      if (gamePads.has(gamePad.index)) {
        const { index, axes, buttons } = gamePad;
        gamePads.set(index, { axes, buttons });
        for (const button in buttons) {
          const key = `${gamePad.index}-${button}`;
          if (pressedButtons.has(key) && isButtonUp(gamePad.index, button)) {
            pressedButtons.delete(key);
          }
        }
      }
    }
  }
  var isKeyDown = (code) => {
    if (Array.isArray(code)) {
      return code.some((c) => heldKeys.has(c));
    }
    return heldKeys.has(code);
  };
  function isKeyPressed(code) {
    if (Array.isArray(code)) {
      for (const c of code) {
        if (heldKeys.has(c) && !pressedKeys.has(c)) {
          pressedKeys.add(c);
          return true;
        }
      }
      return false;
    }
    if (heldKeys.has(code) && !pressedKeys.has(code)) {
      pressedKeys.add(code);
      return true;
    }
    return false;
  }
  var isButtonDown = (padId, button) => gamePads.get(padId)?.buttons[button].pressed ?? false;
  var isButtonUp = (padId, button) => !(gamePads.get(padId)?.buttons[button].pressed ?? false);
  function isButtonPressed(padId, button) {
    const key = `${padId}-${button}`;
    if (isButtonDown(padId, button) && !pressedButtons.has(key)) {
      pressedButtons.add(key);
      return true;
    }
    return false;
  }
  var isAxeGreater = (padId, axeId, value) => gamePads.get(padId)?.axes[axeId] >= value;
  var isAxeLower = (padId, axeId, value) => gamePads.get(padId)?.axes[axeId] <= value;
  var isControlDown = (id, control) => isKeyDown(controls[id].keyboard[control]) || isButtonDown(id, controls[id].gamePad[control]);
  var isControlPressed = (id, control) => id === 1 && cpuController.isControlPressed(control) || isKeyPressed(controls[id].keyboard[control]) || isButtonPressed(id, controls[id].gamePad[control]);
  var isLeft = (id) => id === 1 && cpuController.isLeft() || isKeyDown(controls[id].keyboard[Control.LEFT]) || isButtonDown(id, controls[id].gamePad[Control.LEFT]) || isAxeLower(
    id,
    controls[id].gamePad[GamepadThumbstick.HORIZONTAL_AXE_ID],
    -controls[id].gamePad[GamepadThumbstick.DEAD_ZONE]
  );
  var isRight = (id) => id === 1 && cpuController.isRight() || isKeyDown(controls[id].keyboard[Control.RIGHT]) || isButtonDown(id, controls[id].gamePad[Control.RIGHT]) || isAxeGreater(
    id,
    controls[id].gamePad[GamepadThumbstick.HORIZONTAL_AXE_ID],
    controls[id].gamePad[GamepadThumbstick.DEAD_ZONE]
  );
  var isUp = (id) => id === 1 && cpuController.isUp() || isKeyDown(controls[id].keyboard[Control.UP]) || isButtonDown(id, controls[id].gamePad[Control.UP]) || isAxeLower(
    id,
    controls[id].gamePad[GamepadThumbstick.VERTICAL_AXE_ID],
    -controls[id].gamePad[GamepadThumbstick.DEAD_ZONE]
  );
  var isDown = (id) => id === 1 && cpuController.isDown() || isKeyDown(controls[id].keyboard[Control.DOWN]) || isButtonDown(id, controls[id].gamePad[Control.DOWN]) || isAxeGreater(
    id,
    controls[id].gamePad[GamepadThumbstick.VERTICAL_AXE_ID],
    controls[id].gamePad[GamepadThumbstick.DEAD_ZONE]
  );
  var isForward = (id, direction) => direction === FighterDirection.RIGHT ? isRight(id) : isLeft(id);
  var isBackward = (id, direction) => direction === FighterDirection.LEFT ? isRight(id) : isLeft(id);
  var isIdle = (id) => !(isLeft(id) || isRight(id) || isUp(id) || isDown(id));
  var isLightPunch = (id) => isControlPressed(id, Control.LIGHT_PUNCH);
  var isMediumPunch = (id) => isControlPressed(id, Control.MEDIUM_PUNCH);
  var isHeavyPunch = (id) => isControlPressed(id, Control.HEAVY_PUNCH);
  var isLightKick = (id) => isControlPressed(id, Control.LIGHT_KICK);
  var isMediumKick = (id) => isControlPressed(id, Control.MEDIUM_KICK);
  var isHeavyKick = (id) => isControlPressed(id, Control.HEAVY_KICK);

  // src/constants/stage.js
  var STAGE_FLOOR = 216;
  var STAGE_WIDTH = 768;
  var STAGE_HEIGHT = 256;
  var STAGE_MID_POINT = STAGE_WIDTH / 2;
  var STAGE_PADDING = 256;
  var SCROLL_BOUNDRY = 100;

  // src/engine/Camera.js
  var Camera = class {
    constructor(x, y, fighters) {
      this.position = { x, y };
      this.fighters = fighters;
    }
    update(_, context) {
      this.position.y = -6 + Math.floor(
        Math.min(this.fighters[1].position.y, this.fighters[0].position.y) / 10
      );
      const lowX = Math.min(
        this.fighters[1].position.x,
        this.fighters[0].position.x
      );
      const highX = Math.max(
        this.fighters[1].position.x,
        this.fighters[0].position.x
      );
      if (highX - lowX > SCREEN_WIDTH - SCROLL_BOUNDRY * 2) {
        const midPoint = (highX - lowX) / 2;
        this.position.x = lowX + midPoint - SCREEN_WIDTH / 2;
      } else {
        for (const fighter of this.fighters) {
          if (fighter.position.x < this.position.x + SCROLL_BOUNDRY) {
            this.position.x = fighter.position.x - SCROLL_BOUNDRY;
          } else if (fighter.position.x > this.position.x + SCREEN_WIDTH - SCROLL_BOUNDRY) {
            this.position.x = fighter.position.x - SCREEN_WIDTH + SCROLL_BOUNDRY;
          }
        }
      }
      if (this.position.x < STAGE_PADDING) this.position.x = STAGE_PADDING;
      if (this.position.x > STAGE_WIDTH + STAGE_PADDING - SCREEN_WIDTH) {
        this.position.x = STAGE_WIDTH + STAGE_PADDING - SCREEN_WIDTH;
      }
      if (this.position.y < 0) this.position.y = 0;
      if (this.position.y > STAGE_HEIGHT - SCREEN_HEIGHT) {
        this.position.y = STAGE_HEIGHT - SCREEN_HEIGHT;
      }
    }
  };

  // src/engine/EntityList.js
  var EntityList = class {
    entities = [];
    add(EntityClass, time, ...args) {
      this.entities.push(new EntityClass(args, time, this));
    }
    remove(entity) {
      const index = this.entities.indexOf(entity);
      if (index < 0) return;
      this.entities.splice(index, 1);
    }
    update(time, context, camera) {
      for (const entity of this.entities) {
        entity.update(time, context, camera);
      }
    }
    draw(context, camera) {
      for (const entity of this.entities) {
        entity.draw(context, camera);
      }
    }
  };

  // src/engine/controlHistory.js
  var HISTORY_CAP = 10;
  var MOVE_DELAY = 150;
  var controlHistory = [
    // Player 1
    [
      {
        time: 0,
        move: void 0,
        buttons: [false, false, false, false, false, false]
      }
    ],
    // Player 2
    [
      {
        time: 0,
        move: void 0,
        buttons: [false, false, false, false, false, false]
      }
    ]
  ];
  var buttonOrder = [
    Control.LIGHT_KICK,
    Control.MEDIUM_KICK,
    Control.HEAVY_KICK,
    Control.LIGHT_PUNCH,
    Control.MEDIUM_PUNCH,
    Control.HEAVY_PUNCH
  ];
  function getMoveDirection(controls2) {
    if (controls2.forward) {
      if (controls2.down) return SpecialMoveDirection.FORWARD_DOWN;
      if (controls2.up) return SpecialMoveDirection.FORWARD_UP;
      return SpecialMoveDirection.FORWARD;
    } else if (controls2.backward) {
      if (controls2.down) return SpecialMoveDirection.BACKWARD_DOWN;
      if (controls2.up) return SpecialMoveDirection.BACKWARD_UP;
      return SpecialMoveDirection.BACKWARD;
    } else if (controls2.down) {
      return SpecialMoveDirection.DOWN;
    } else if (controls2.up) {
      return SpecialMoveDirection.UP;
    }
    return SpecialMoveDirection.NONE;
  }
  function getCurrentControlSnapshot(time, id, direction) {
    const polledControls = {
      forward: isForward(id, direction),
      backward: isBackward(id, direction),
      down: isDown(id),
      up: isUp(id)
    };
    return {
      time: time.previous,
      move: getMoveDirection(polledControls),
      buttons: buttonOrder.map((button) => isControlDown(id, button))
    };
  }
  function isLastSnapshotDifferent(snapshot, id) {
    if (controlHistory[id][0].move !== snapshot.move || controlHistory[id][0].buttons.some(
      (button, index) => snapshot.buttons[index] !== button
    ))
      return true;
    return false;
  }
  function hasControlMatched(control, id) {
    switch (control) {
      case SpecialMoveButton.ANY_PUNCH:
        for (let buttonIndex = 3; buttonIndex < 6; buttonIndex++) {
          if (controlHistory[id][0].buttons[buttonIndex])
            return buttonOrder[buttonIndex];
        }
        break;
      case SpecialMoveButton.ANY_KICK:
        for (let buttonIndex = 0; buttonIndex < 3; buttonIndex++) {
          if (controlHistory[id][0].buttons[buttonIndex])
            return buttonOrder[buttonIndex];
        }
        break;
      default:
        if (control === controlHistory[id][0].move) return true;
    }
    return false;
  }
  function pollControl(time, id, direction) {
    const currentControlSnapshot = getCurrentControlSnapshot(
      time,
      id,
      direction
    );
    if (!isLastSnapshotDifferent(currentControlSnapshot, id)) return;
    controlHistory[id].unshift(currentControlSnapshot);
    if (controlHistory[id].length >= HISTORY_CAP) controlHistory[id].pop();
  }
  function hasSpecialMoveBeenExecuted(specialMove, id, time) {
    const controlMatched = hasControlMatched(
      specialMove.sequence[specialMove.cursor],
      id
    );
    if (!controlMatched) {
      if (controlHistory[id][0].time + MOVE_DELAY < time.previous && specialMove.cursor > 1)
        specialMove.cursor = 0;
      return false;
    }
    if (specialMove.cursor === specialMove.sequence.length - 1) {
      specialMove.cursor = 0;
      return controlMatched;
    }
    specialMove.cursor += 1;
    return false;
  }

  // src/state/matchManager.js
  var GameScreen = {
    MAIN_MENU: "MAIN_MENU",
    FIGHTER_SELECT: "FIGHTER_SELECT",
    STAGE_SELECT: "STAGE_SELECT",
    FIGHTING: "FIGHTING",
    ROUND_RESULT: "ROUND_RESULT",
    STAGE_COMPLETE: "STAGE_COMPLETE",
    FINAL_VICTORY: "FINAL_VICTORY",
    DEFEAT: "DEFEAT",
    INSTRUCTIONS: "INSTRUCTIONS",
    SETTINGS: "SETTINGS",
    CREDITS: "CREDITS"
  };
  var FIGHTERS = [
    {
      id: "Ken",
      baseClass: "Ken",
      name: "Ken Masters",
      title: "The Blazing Dragon",
      color: "#ff3b30",
      stats: { attack: 85, speed: 90, defense: 80 },
      avatar: "ken-avatar"
    },
    {
      id: "Ryu",
      baseClass: "Ryu",
      name: "Ryu",
      title: "The Wandering Warrior",
      color: "#ffffff",
      stats: { attack: 90, speed: 80, defense: 85 },
      avatar: "ryu-avatar"
    },
    {
      id: "Kaelen",
      baseClass: "Ryu",
      name: "Kaelen Vance",
      title: "Cyber Strike Specialist",
      color: "#00f0ff",
      stats: { attack: 92, speed: 82, defense: 86 },
      avatar: "kaelen-avatar"
    },
    {
      id: "Vespera",
      baseClass: "Ken",
      name: "Vespera Vex",
      title: "Shadow Assassin",
      color: "#af52de",
      stats: { attack: 82, speed: 95, defense: 78 },
      avatar: "vespera-avatar"
    },
    {
      id: "Omega",
      baseClass: "Ryu",
      name: "Omega Prime",
      title: "Heavy Vanguard",
      color: "#ff9500",
      stats: { attack: 95, speed: 75, defense: 92 },
      avatar: "omega-avatar"
    }
  ];
  var STAGES = [
    {
      id: "neo_city",
      name: "NEO CITY",
      subtitle: "Harbor District - 2088",
      filter: "none",
      atmosphere: "Neon Harbor Skyline"
    },
    {
      id: "tokyo_night",
      name: "TOKYO NIGHT",
      subtitle: "Midnight Docks",
      filter: "hue-rotate(210deg) saturate(1.4) brightness(0.85)",
      atmosphere: "Deep Blue Cyber Night"
    },
    {
      id: "cyber_arena",
      name: "CYBER ARENA",
      subtitle: "Virtual Grid Port",
      filter: "hue-rotate(150deg) saturate(1.6) contrast(1.1)",
      atmosphere: "Matrix Cyan Glow"
    },
    {
      id: "rooftop",
      name: "ROOFTOP",
      subtitle: "Sunset Overpass",
      filter: "sepia(0.5) hue-rotate(330deg) saturate(1.5)",
      atmosphere: "Golden Hour Dusk"
    },
    {
      id: "training_dojo",
      name: "TRAINING DOJO",
      subtitle: "Simulation Zone",
      filter: "grayscale(0.6) contrast(1.2) brightness(1.05)",
      atmosphere: "Monochrome Holodeck"
    }
  ];
  var DIFFICULTIES = ["EASY", "MEDIUM", "HARD"];
  var MatchManager = class {
    currentScreen = GameScreen.MAIN_MENU;
    selectedFighterIndex = 0;
    selectedOpponentIndex = 1;
    selectedStageIndex = 0;
    difficulty = "MEDIUM";
    isCpu = true;
    // Match progression
    roundsToWin = 2;
    currentRound = 1;
    roundsWon = [0, 0];
    // [P1 wins, P2 wins]
    roundHistory = [];
    // record of each round winner
    score = 0;
    damageTaken = 0;
    matchStartTime = 0;
    // Last round result
    roundResult = null;
    // Settings
    settings = {
      sound: true,
      music: true,
      volume: 0.8,
      fullscreen: false
    };
    setScreen(screen) {
      this.currentScreen = screen;
    }
    getPlayerFighter() {
      return FIGHTERS[this.selectedFighterIndex] || FIGHTERS[0];
    }
    getOpponentFighter() {
      return FIGHTERS[this.selectedOpponentIndex] || FIGHTERS[1];
    }
    getCurrentStage() {
      return STAGES[this.selectedStageIndex] || STAGES[0];
    }
    selectFighter(index) {
      this.selectedFighterIndex = index;
      let oppIdx = (index + 1) % FIGHTERS.length;
      this.selectedOpponentIndex = oppIdx;
    }
    selectStage(index) {
      this.selectedStageIndex = Math.max(0, Math.min(STAGES.length - 1, index));
    }
    setDifficulty(diff) {
      if (DIFFICULTIES.includes(diff)) {
        this.difficulty = diff;
      }
    }
    startMatch() {
      this.currentRound = 1;
      this.roundsWon = [0, 0];
      this.roundHistory = [];
      this.matchStartTime = Date.now();
      this.currentScreen = GameScreen.FIGHTING;
    }
    recordRoundEnd(winnerIndex, p1Hp, p2Hp, timeRemaining) {
      const isPlayerWin = winnerIndex === 0;
      const winnerFighter = isPlayerWin ? this.getPlayerFighter() : this.getOpponentFighter();
      const loserFighter = isPlayerWin ? this.getOpponentFighter() : this.getPlayerFighter();
      this.roundsWon[winnerIndex] += 1;
      this.roundHistory.push(winnerIndex);
      const perfectWin = isPlayerWin && p1Hp >= 100;
      let roundScore = 0;
      if (isPlayerWin) {
        roundScore += 1e3;
        if (perfectWin) roundScore += 2e3;
        roundScore += Math.max(0, Math.floor(timeRemaining * 20));
        this.score += roundScore;
      }
      const p1Damage = Math.max(0, 100 - p1Hp);
      this.damageTaken += p1Damage;
      const isMatchWon = this.roundsWon[0] >= this.roundsToWin;
      const isMatchLost = this.roundsWon[1] >= this.roundsToWin;
      this.roundResult = {
        roundNumber: this.currentRound,
        winnerIndex,
        winnerName: winnerFighter.name,
        loserName: loserFighter.name,
        isPlayerWin,
        perfectWin,
        roundScore,
        totalScore: this.score,
        isMatchWon,
        isMatchLost
      };
      return this.roundResult;
    }
    advanceRound() {
      this.currentRound += 1;
      this.currentScreen = GameScreen.FIGHTING;
    }
    advanceStage() {
      this.score += 3e3;
      this.selectedStageIndex = this.selectedStageIndex + 1;
      if (this.selectedStageIndex >= STAGES.length) {
        this.currentScreen = GameScreen.FINAL_VICTORY;
      } else {
        this.selectedOpponentIndex = (this.selectedOpponentIndex + 1) % FIGHTERS.length;
        if (this.selectedOpponentIndex === this.selectedFighterIndex) {
          this.selectedOpponentIndex = (this.selectedOpponentIndex + 1) % FIGHTERS.length;
        }
        this.currentRound = 1;
        this.roundsWon = [0, 0];
        this.roundHistory = [];
        this.currentScreen = GameScreen.FIGHTING;
      }
    }
    retryRound() {
      this.currentScreen = GameScreen.FIGHTING;
    }
    calculateRank() {
      const score = this.score;
      const damage = this.damageTaken;
      if (score >= 12e3 && damage <= 80) return "S";
      if (score >= 9e3 && damage <= 160) return "A";
      if (score >= 6e3) return "B";
      if (score >= 3e3) return "C";
      return "D";
    }
  };
  var matchManager = new MatchManager();

  // src/engine/soundHandler.js
  function playSound(sound, volume = 1) {
    if (!sound) return;
    const isMusic = sound.id === "theme-ken";
    if (isMusic && !matchManager.settings.music) return;
    if (!isMusic && !matchManager.settings.sound) return;
    sound.volume = volume * (matchManager.settings.volume ?? 1);
    if (!sound.paused && sound.currentTime > 0) {
      sound.currentTime = 0;
    } else {
      const playPromise = sound.play();
      if (playPromise !== void 0) {
        playPromise.catch(() => {
        });
      }
    }
  }
  function stopSound(sound) {
    if (!sound) return;
    sound.pause();
    sound.currentTime = 0;
  }

  // src/utils/collisions.js
  function rectsOverlap(x1, y1, width1, height1, x2, y2, width2, height2) {
    return x1 < x2 + width2 && x1 + width1 > x2 && y1 < y2 + height2 && y1 + height1 > y2;
  }
  function boxOverlap(box1, box2) {
    return rectsOverlap(
      box1.x,
      box1.y,
      box1.width,
      box1.height,
      box2.x,
      box2.y,
      box2.width,
      box2.height
    );
  }
  function getActualBoxDimensions(position, direction, box) {
    const x1 = position.x + box.x * direction;
    const x2 = x1 + box.width * direction;
    return {
      x: Math.min(x1, x2),
      y: position.y + box.y,
      width: box.width,
      height: box.height
    };
  }

  // src/constants/battle.js
  var TIME_DELAY = 30 * FRAME_TIME;
  var TIME_FLASH_DELAY = 3 * FRAME_TIME;
  var TIME_FRAME_KEYS = ["time", "time-flash"];
  var KO_FLASH_DELAY = [4 * FRAME_TIME, 7 * FRAME_TIME];
  var KO_ANIMATION = ["ko-white", "ko-red"];
  var HEALTH_MAX_HIT_POINTS = 144;
  var HEALTH_CRITICAL_HIT_POINTS = 45;
  var HEALTH_DAMAGE_COLOR = "#F30000";

  // src/state/fighterState.js
  var createDefaultFighterState = (id) => ({
    id,
    score: 1,
    battles: 0,
    hitPoints: HEALTH_MAX_HIT_POINTS
  });

  // src/state/gameState.js
  var gameState = {
    fighters: [
      createDefaultFighterState(FighterId.RYU),
      createDefaultFighterState(FighterId.KEN)
    ],
    resetFighterStates(p1Id = FighterId.RYU, p2Id = FighterId.KEN) {
      this.fighters = [
        createDefaultFighterState(p1Id),
        createDefaultFighterState(p2Id)
      ];
    }
  };

  // src/utils/entityDebug.js
  function drawCross(context, camera, position, color) {
    context.beginPath();
    context.strokeStyle = color;
    context.moveTo(
      Math.floor(position.x - camera.position.x) - 4,
      Math.floor(position.y - camera.position.y) - 0.5
    );
    context.lineTo(
      Math.floor(position.x - camera.position.x) + 5,
      Math.floor(position.y - camera.position.y) - 0.5
    );
    context.moveTo(
      Math.floor(position.x - camera.position.x) + 0.5,
      Math.floor(position.y - camera.position.y) - 5
    );
    context.lineTo(
      Math.floor(position.x - camera.position.x) + 0.5,
      Math.floor(position.y - camera.position.y) + 4
    );
    context.stroke();
  }
  function drawBox(context, camera, position, direction, dimensions, color) {
    if (!Array.isArray(dimensions)) return;
    const [x = 0, y = 0, width = 0, height = 0] = dimensions;
    context.beginPath();
    context.strokeStyle = color + "AA";
    context.fillStyle = color + "44";
    context.fillRect(
      Math.floor(position.x + x * direction - camera.position.x) + 0.5,
      Math.floor(position.y + y - camera.position.y) + 0.5,
      width * direction,
      height
    );
    context.rect(
      Math.floor(position.x + x * direction - camera.position.x) + 0.5,
      Math.floor(position.y + y - camera.position.y) + 0.5,
      width * direction,
      height
    );
    context.stroke();
  }

  // src/utils/fighterDebug.js
  function drawCollisionInfo(fighter, context, camera) {
    const { position, direction, boxes } = fighter;
    context.lineWidth = 1;
    drawBox(
      context,
      camera,
      position,
      direction,
      Object.values(boxes.push),
      "#55FF55"
    );
    for (const hurtBox of Object.values(boxes.hurt)) {
      drawBox(context, camera, position, direction, hurtBox, "#7777FF");
    }
    drawBox(
      context,
      camera,
      position,
      direction,
      Object.values(boxes.hit),
      "#FF0000"
    );
    drawCross(context, camera, position, "#FFFFFF");
  }
  function logHit(fighter, hitStrength, hitLocation) {
    console.log(
      `${gameState.fighters[fighter.playerId].id} has hit ${gameState.fighters[fighter.opponent.playerId].id}'s ${hitLocation} with a ${hitStrength} attack!`
    );
  }

  // src/entities/fighters/Fighter.js
  var Fighter = class {
    frames = /* @__PURE__ */ new Map();
    image = new Image();
    animationFrame = 0;
    animationTimer = 0;
    animations = {};
    currentState = FighterState.IDLE;
    opponent = void 0;
    hurtBy = void 0;
    hurtShake = 0;
    hurtShakeTimer = 0;
    slideVelocity = 0;
    slideFriction = 0;
    gravity = 0;
    velocity = { x: 0, y: 0 };
    initialVelocity = {};
    attackStruck = false;
    boxes = {
      push: { x: 0, y: 0, width: 0, height: 0 },
      hit: { x: 0, y: 0, width: 0, height: 0 },
      hurt: {
        [FighterHurtBox.HEAD]: [0, 0, 0, 0],
        [FighterHurtBox.BODY]: [0, 0, 0, 0],
        [FighterHurtBox.FEET]: [0, 0, 0, 0]
      }
    };
    states = {
      [FighterState.IDLE]: {
        init: this.handleIdleInit.bind(this),
        update: this.handleIdleState.bind(this),
        validFrom: [
          void 0,
          FighterState.IDLE,
          FighterState.WALK_FORWARD,
          FighterState.WALK_BACKWARD,
          FighterState.JUMP_UP,
          FighterState.JUMP_FORWARD,
          FighterState.JUMP_BACKWARD,
          FighterState.JUMP_LAND,
          FighterState.CROUCH_UP,
          FighterState.IDLE_TURN,
          FighterState.LIGHT_PUNCH,
          FighterState.MEDIUM_PUNCH,
          FighterState.HEAVY_PUNCH,
          FighterState.LIGHT_KICK,
          FighterState.MEDIUM_KICK,
          FighterState.HEAVY_KICK,
          FighterState.HURT_HEAD_LIGHT,
          FighterState.HURT_HEAD_MEDIUM,
          FighterState.HURT_HEAD_HEAVY,
          FighterState.HURT_BODY_LIGHT,
          FighterState.HURT_BODY_MEDIUM,
          FighterState.HURT_BODY_HEAVY
        ]
      },
      [FighterState.WALK_FORWARD]: {
        init: this.handleMoveInit.bind(this),
        update: this.handleWalkForwardState.bind(this),
        validFrom: [FighterState.IDLE, FighterState.WALK_BACKWARD]
      },
      [FighterState.WALK_BACKWARD]: {
        init: this.handleMoveInit.bind(this),
        update: this.handleWalkBackwardState.bind(this),
        validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD]
      },
      [FighterState.JUMP_START]: {
        init: this.handleJumpStartInit.bind(this),
        update: this.handleJumpStartState.bind(this),
        validFrom: [
          FighterState.IDLE,
          FighterState.JUMP_LAND,
          FighterState.WALK_FORWARD,
          FighterState.WALK_BACKWARD
        ]
      },
      [FighterState.JUMP_UP]: {
        init: this.handleJumpInit.bind(this),
        update: this.handleJumpState.bind(this),
        validFrom: [FighterState.JUMP_START]
      },
      [FighterState.JUMP_FORWARD]: {
        init: this.handleJumpInit.bind(this),
        update: this.handleJumpState.bind(this),
        validFrom: [FighterState.JUMP_START]
      },
      [FighterState.JUMP_LAND]: {
        init: this.handleJumpLandInit.bind(this),
        update: this.handleJumpLandState.bind(this),
        validFrom: [
          FighterState.JUMP_UP,
          FighterState.JUMP_FORWARD,
          FighterState.JUMP_BACKWARD
        ]
      },
      [FighterState.JUMP_BACKWARD]: {
        init: this.handleJumpInit.bind(this),
        update: this.handleJumpState.bind(this),
        validFrom: [FighterState.JUMP_START]
      },
      [FighterState.CROUCH]: {
        init: () => {
        },
        update: this.handleCrouchState.bind(this),
        validFrom: [FighterState.CROUCH_DOWN, FighterState.CROUCH_TURN]
      },
      [FighterState.CROUCH_DOWN]: {
        init: this.handleCrouchInit.bind(this),
        update: this.handleCrouchDownState.bind(this),
        validFrom: [
          FighterState.IDLE,
          FighterState.WALK_FORWARD,
          FighterState.WALK_BACKWARD
        ]
      },
      [FighterState.CROUCH_UP]: {
        init: () => {
        },
        update: this.handleCrouchUpState.bind(this),
        validFrom: [FighterState.CROUCH]
      },
      [FighterState.IDLE_TURN]: {
        init: () => {
        },
        update: this.handleIdleTurnState.bind(this),
        validFrom: [
          FighterState.IDLE,
          FighterState.JUMP_LAND,
          FighterState.WALK_FORWARD,
          FighterState.WALK_BACKWARD
        ]
      },
      [FighterState.CROUCH_TURN]: {
        init: () => {
        },
        update: this.handleCrouchTurnState.bind(this),
        validFrom: [FighterState.CROUCH]
      },
      [FighterState.LIGHT_PUNCH]: {
        attackType: FighterAttackType.PUNCH,
        attackStrength: FighterAttackStrength.LIGHT,
        init: this.handleAttackInit.bind(this),
        update: this.handleLightPunchState.bind(this),
        validFrom: [
          FighterState.IDLE,
          FighterState.WALK_FORWARD,
          FighterState.WALK_BACKWARD
        ]
      },
      [FighterState.MEDIUM_PUNCH]: {
        attackType: FighterAttackType.PUNCH,
        attackStrength: FighterAttackStrength.MEDIUM,
        init: this.handleAttackInit.bind(this),
        update: this.handleMediumPunchState.bind(this),
        validFrom: [
          FighterState.IDLE,
          FighterState.WALK_FORWARD,
          FighterState.WALK_BACKWARD
        ]
      },
      [FighterState.HEAVY_PUNCH]: {
        attackType: FighterAttackType.PUNCH,
        attackStrength: FighterAttackStrength.HEAVY,
        init: this.handleAttackInit.bind(this),
        update: this.handleMediumPunchState.bind(this),
        validFrom: [
          FighterState.IDLE,
          FighterState.WALK_FORWARD,
          FighterState.WALK_BACKWARD
        ]
      },
      [FighterState.LIGHT_KICK]: {
        attackType: FighterAttackType.KICK,
        attackStrength: FighterAttackStrength.LIGHT,
        init: this.handleAttackInit.bind(this),
        update: this.handleLightKickState.bind(this),
        validFrom: [
          FighterState.IDLE,
          FighterState.WALK_FORWARD,
          FighterState.WALK_BACKWARD
        ]
      },
      [FighterState.MEDIUM_KICK]: {
        attackType: FighterAttackType.KICK,
        attackStrength: FighterAttackStrength.MEDIUM,
        init: this.handleAttackInit.bind(this),
        update: this.handleMediumKickState.bind(this),
        validFrom: [
          FighterState.IDLE,
          FighterState.WALK_FORWARD,
          FighterState.WALK_BACKWARD
        ]
      },
      [FighterState.HEAVY_KICK]: {
        attackType: FighterAttackType.KICK,
        attackStrength: FighterAttackStrength.HEAVY,
        init: this.handleAttackInit.bind(this),
        update: this.handleMediumKickState.bind(this),
        validFrom: [
          FighterState.IDLE,
          FighterState.WALK_FORWARD,
          FighterState.WALK_BACKWARD
        ]
      },
      [FighterState.HURT_HEAD_LIGHT]: {
        init: this.handleHurtInit.bind(this),
        update: this.handleHurtState.bind(this),
        validFrom: HurtStateValidFrom
      },
      [FighterState.HURT_HEAD_MEDIUM]: {
        init: this.handleHurtInit.bind(this),
        update: this.handleHurtState.bind(this),
        validFrom: HurtStateValidFrom
      },
      [FighterState.HURT_HEAD_HEAVY]: {
        init: this.handleHurtInit.bind(this),
        update: this.handleHurtState.bind(this),
        validFrom: HurtStateValidFrom
      },
      [FighterState.HURT_BODY_LIGHT]: {
        init: this.handleHurtInit.bind(this),
        update: this.handleHurtState.bind(this),
        validFrom: HurtStateValidFrom
      },
      [FighterState.HURT_BODY_MEDIUM]: {
        init: this.handleHurtInit.bind(this),
        update: this.handleHurtState.bind(this),
        validFrom: HurtStateValidFrom
      },
      [FighterState.HURT_BODY_HEAVY]: {
        init: this.handleHurtInit.bind(this),
        update: this.handleHurtState.bind(this),
        validFrom: HurtStateValidFrom
      },
      [FighterState.WINNER_POSE]: {
        init: this.handleWinnerPoseInit.bind(this),
        update: () => {
        },
        validFrom: [
          void 0,
          FighterState.IDLE,
          FighterState.WALK_FORWARD,
          FighterState.WALK_BACKWARD,
          FighterState.JUMP_UP,
          FighterState.JUMP_FORWARD,
          FighterState.JUMP_BACKWARD,
          FighterState.JUMP_LAND,
          FighterState.CROUCH_UP,
          FighterState.IDLE_TURN,
          FighterState.LIGHT_PUNCH,
          FighterState.MEDIUM_PUNCH,
          FighterState.HEAVY_PUNCH,
          FighterState.LIGHT_KICK,
          FighterState.MEDIUM_KICK,
          FighterState.HEAVY_KICK,
          FighterState.HURT_HEAD_LIGHT,
          FighterState.HURT_HEAD_MEDIUM,
          FighterState.HURT_HEAD_HEAVY,
          FighterState.HURT_BODY_LIGHT,
          FighterState.HURT_BODY_MEDIUM,
          FighterState.HURT_BODY_HEAVY
        ]
      }
    };
    soundAttacks = {
      [FighterAttackStrength.LIGHT]: document.querySelector(
        "audio#sound-fighter-light-attack"
      ),
      [FighterAttackStrength.MEDIUM]: document.querySelector(
        "audio#sound-fighter-medium-attack"
      ),
      [FighterAttackStrength.HEAVY]: document.querySelector(
        "audio#sound-fighter-heavy-attack"
      )
    };
    soundHits = {
      [FighterAttackStrength.LIGHT]: {
        [FighterAttackType.PUNCH]: document.querySelector(
          "audio#sound-fighter-light-punch-hit"
        ),
        [FighterAttackType.KICK]: document.querySelector(
          "audio#sound-fighter-light-kick-hit"
        )
      },
      [FighterAttackStrength.MEDIUM]: {
        [FighterAttackType.PUNCH]: document.querySelector(
          "audio#sound-fighter-medium-punch-hit"
        ),
        [FighterAttackType.KICK]: document.querySelector(
          "audio#sound-fighter-medium-kick-hit"
        )
      },
      [FighterAttackStrength.HEAVY]: {
        [FighterAttackType.PUNCH]: document.querySelector(
          "audio#sound-fighter-heavy-punch-hit"
        ),
        [FighterAttackType.KICK]: document.querySelector(
          "audio#sound-fighter-heavy-kick-hit"
        )
      }
    };
    soundLand = document.querySelector("audio#sound-fighter-land");
    constructor({ playerId, onAttackHit }) {
      this.playerId = playerId;
      this.onAttackHit = onAttackHit;
      this.position = {
        x: STAGE_MID_POINT + STAGE_PADDING + (playerId === 0 ? -FIGHTER_START_DISTANCE : FIGHTER_START_DISTANCE),
        y: STAGE_FLOOR
      };
      this.direction = playerId === 0 ? FighterDirection.RIGHT : FighterDirection.LEFT;
    }
    isAnimationCompleted = () => this.animations[this.currentState][this.animationFrame][1] === FrameDelay.TRANSITION;
    hasCollidedWithOpponent = () => rectsOverlap(
      this.position.x + this.boxes.push.x,
      this.position.y + this.boxes.push.y,
      this.boxes.push.width,
      this.boxes.push.height,
      this.opponent.position.x + this.opponent.boxes.push.x,
      this.opponent.position.y + this.opponent.boxes.push.y,
      this.opponent.boxes.push.width,
      this.opponent.boxes.push.height
    );
    resetVelocities() {
      this.velocity = { x: 0, y: 0 };
    }
    resetSlide(transferToOpponent = false) {
      if (transferToOpponent && this.hurtBy === FighterHurtBy.FIGHTER) {
        this.opponent.slideVelocity = this.slideVelocity;
        this.opponent.slideFriction = this.slideFriction;
      }
      this.slideFriction = 0;
      this.slideVelocity = 0;
    }
    getDirection() {
      if (this.position.x + this.boxes.push.x + this.boxes.push.width <= this.opponent.position.x + this.opponent.boxes.push.x) {
        return FighterDirection.RIGHT;
      } else if (this.position.x + this.boxes.push.x >= this.opponent.position.x + this.opponent.boxes.push.x + this.opponent.boxes.push.width) {
        return FighterDirection.LEFT;
      }
      return this.direction;
    }
    getBoxes(frameKey) {
      const [
        ,
        [pushX = 0, pushY = 0, pushWidth = 0, pushHeight = 0] = [],
        [
          head = [0, 0, 0, 0],
          body = [0, 0, 0, 0],
          feet = [0, 0, 0, 0]
        ] = [],
        [hitX = 0, hitY = 0, hitWidth = 0, hitHeight = 0] = []
      ] = this.frames.get(frameKey);
      return {
        push: { x: pushX, y: pushY, width: pushWidth, height: pushHeight },
        hit: { x: hitX, y: hitY, width: hitWidth, height: hitHeight },
        hurt: {
          [FighterHurtBox.HEAD]: head,
          [FighterHurtBox.BODY]: body,
          [FighterHurtBox.FEET]: feet
        }
      };
    }
    getHurtState(attackStrength, hitLocation) {
      switch (attackStrength) {
        case FighterAttackStrength.LIGHT:
          if (hitLocation === FighterHurtBox.HEAD)
            return FighterState.HURT_HEAD_LIGHT;
          return FighterState.HURT_BODY_LIGHT;
        case FighterAttackStrength.MEDIUM:
          if (hitLocation === FighterHurtBox.HEAD)
            return FighterState.HURT_HEAD_MEDIUM;
          return FighterState.HURT_BODY_MEDIUM;
        case FighterAttackStrength.HEAVY:
          if (hitLocation === FighterHurtBox.HEAD)
            return FighterState.HURT_HEAD_HEAVY;
          return FighterState.HURT_BODY_HEAVY;
      }
    }
    setAnimationFrame(frame, time) {
      const animation = this.animations[this.currentState];
      this.animationFrame = frame;
      if (this.animationFrame >= animation.length) this.animationFrame = 0;
      const [frameKey, frameDelay] = animation[this.animationFrame];
      this.boxes = this.getBoxes(frameKey);
      this.animationTimer = time.previous + frameDelay * FRAME_TIME;
    }
    changeState(newState, time, args) {
      if (newState === this.currentState || !this.states[newState].validFrom.includes(this.currentState)) {
        if (!ENABLE_DEBUG) return;
        console.warn(
          `Illegal transition from "${this.currentState}" to "${newState}"`
        );
        return;
      }
      this.currentState = newState;
      this.setAnimationFrame(0, time);
      this.states[this.currentState].init(time, args);
    }
    handleFinishRound(isWinner, time) {
      if (isWinner) this.changeState(FighterState.WINNER_POSE, time);
    }
    handleIdleInit() {
      this.resetVelocities();
      this.attackStruck = false;
    }
    handleMoveInit() {
      this.velocity.x = this.initialVelocity.x[this.currentState] ?? 0;
    }
    handleJumpInit() {
      this.velocity.y = this.initialVelocity.jump;
      this.handleMoveInit();
    }
    handleJumpStartInit() {
      this.resetVelocities();
    }
    handleJumpLandInit() {
      this.resetVelocities();
      playSound(this.soundLand, 0.09);
    }
    handleCrouchInit() {
      this.resetVelocities();
    }
    handleAttackInit() {
      this.resetVelocities();
      playSound(
        this.soundAttacks[this.states[this.currentState].attackStrength],
        0.09
      );
    }
    handleHurtInit(time) {
      this.resetVelocities();
      this.hurtShake = 2;
      this.hurtShakeTimer = time.previous + FRAME_TIME;
    }
    handleWinnerPoseInit(time) {
      this.resetVelocities();
    }
    handleIdleState(time) {
      if (isUp(this.playerId)) {
        this.changeState(FighterState.JUMP_START, time);
      } else if (isDown(this.playerId)) {
        this.changeState(FighterState.CROUCH_DOWN, time);
      } else if (isBackward(this.playerId, this.direction)) {
        this.changeState(FighterState.WALK_BACKWARD, time);
      } else if (isForward(this.playerId, this.direction)) {
        this.changeState(FighterState.WALK_FORWARD, time);
      } else if (isLightPunch(this.playerId)) {
        this.changeState(FighterState.LIGHT_PUNCH, time);
      } else if (isMediumPunch(this.playerId)) {
        this.changeState(FighterState.MEDIUM_PUNCH, time);
      } else if (isHeavyPunch(this.playerId)) {
        this.changeState(FighterState.HEAVY_PUNCH, time);
      } else if (isLightKick(this.playerId)) {
        this.changeState(FighterState.LIGHT_KICK, time);
      } else if (isMediumKick(this.playerId)) {
        this.changeState(FighterState.MEDIUM_KICK, time);
      } else if (isHeavyKick(this.playerId)) {
        this.changeState(FighterState.HEAVY_KICK, time);
      }
      const newDirection = this.getDirection();
      if (newDirection !== this.direction) {
        this.direction = newDirection;
        this.changeState(FighterState.IDLE_TURN, time);
      }
    }
    handleWalkForwardState(time) {
      if (!isForward(this.playerId, this.direction)) {
        this.changeState(FighterState.IDLE, time);
      } else if (isUp(this.playerId)) {
        this.changeState(FighterState.JUMP_START, time);
      } else if (isDown(this.playerId)) {
        this.changeState(FighterState.CROUCH_DOWN, time);
      }
      if (isLightPunch(this.playerId)) {
        this.changeState(FighterState.LIGHT_PUNCH, time);
      } else if (isMediumPunch(this.playerId)) {
        this.changeState(FighterState.MEDIUM_PUNCH, time);
      } else if (isHeavyPunch(this.playerId)) {
        this.changeState(FighterState.HEAVY_PUNCH, time);
      } else if (isLightKick(this.playerId)) {
        this.changeState(FighterState.LIGHT_KICK, time);
      } else if (isMediumKick(this.playerId)) {
        this.changeState(FighterState.MEDIUM_KICK, time);
      } else if (isHeavyKick(this.playerId)) {
        this.changeState(FighterState.HEAVY_KICK, time);
      }
      this.direction = this.getDirection();
    }
    handleWalkBackwardState(time) {
      if (!isBackward(this.playerId, this.direction)) {
        this.changeState(FighterState.IDLE, time);
      } else if (isUp(this.playerId)) {
        this.changeState(FighterState.JUMP_START, time);
      } else if (isDown(this.playerId)) {
        this.changeState(FighterState.CROUCH_DOWN, time);
      }
      if (isLightPunch(this.playerId)) {
        this.changeState(FighterState.LIGHT_PUNCH, time);
      } else if (isMediumPunch(this.playerId)) {
        this.changeState(FighterState.MEDIUM_PUNCH, time);
      } else if (isHeavyPunch(this.playerId)) {
        this.changeState(FighterState.HEAVY_PUNCH, time);
      } else if (isLightKick(this.playerId)) {
        this.changeState(FighterState.LIGHT_KICK, time);
      } else if (isMediumKick(this.playerId)) {
        this.changeState(FighterState.MEDIUM_KICK, time);
      } else if (isHeavyKick(this.playerId)) {
        this.changeState(FighterState.HEAVY_KICK, time);
      }
      this.direction = this.getDirection();
    }
    handleJumpState(time) {
      if (!isUp) this.changeState(FighterState.IDLE, time);
      this.velocity.y += this.gravity * time.secondsPassed;
      if (this.position.y > STAGE_FLOOR) {
        this.position.y = STAGE_FLOOR;
        this.changeState(FighterState.JUMP_LAND, time);
      }
    }
    handleCrouchState(time) {
      if (!isDown(this.playerId))
        this.changeState(FighterState.CROUCH_UP, time);
      const newDirection = this.getDirection();
      if (newDirection !== this.direction) {
        this.direction = newDirection;
        this.changeState(FighterState.CROUCH_TURN, time);
      }
    }
    handleCrouchDownState(time) {
      if (this.isAnimationCompleted()) {
        this.changeState(FighterState.CROUCH, time);
      }
      if (!isDown(this.playerId)) {
        this.currentState = FighterState.CROUCH_UP;
        this.setAnimationFrame(
          Math.max(
            0,
            this.animations[FighterState.CROUCH_UP][this.animationFrame].length - this.animationFrame
          ),
          time
        );
      }
    }
    handleCrouchUpState(time) {
      if (this.isAnimationCompleted()) {
        this.changeState(FighterState.IDLE, time);
      }
    }
    handleJumpStartState(time) {
      if (this.isAnimationCompleted()) {
        if (isBackward(this.playerId, this.direction)) {
          this.changeState(FighterState.JUMP_BACKWARD, time);
        } else if (isForward(this.playerId, this.direction)) {
          this.changeState(FighterState.JUMP_FORWARD, time);
        } else {
          this.changeState(FighterState.JUMP_UP, time);
        }
      }
    }
    handleJumpLandState(time) {
      if (this.animationFrame < 1) return;
      let newState = FighterState.IDLE;
      if (!isIdle(this.playerId)) {
        this.direction = this.getDirection();
        this.handleIdleState(time);
      } else {
        const newDirection = this.getDirection();
        if (newDirection !== this.direction) {
          this.direction = newDirection;
          newState = FighterState.IDLE_TURN;
        } else {
          if (!this.isAnimationCompleted()) return;
        }
      }
      this.changeState(newState, time);
    }
    handleIdleTurnState(time) {
      this.handleIdleState();
      if (!this.isAnimationCompleted()) return;
      this.changeState(FighterState.IDLE, time);
    }
    handleCrouchTurnState(time) {
      this.handleCrouchState();
      if (!this.isAnimationCompleted()) return;
      this.changeState(FighterState.CROUCH, time);
    }
    handleLightAttackReset(time) {
      this.setAnimationFrame(0, time);
      this.handleAttackInit();
      this.attackStruck = false;
    }
    handleLightPunchState(time) {
      if (this.animationFrame < 2) return;
      if (isLightPunch(this.playerId))
        this.handleLightAttackReset(time);
      if (!this.isAnimationCompleted()) return;
      this.changeState(FighterState.IDLE, time);
    }
    handleMediumPunchState(time) {
      if (!this.isAnimationCompleted()) return;
      this.changeState(FighterState.IDLE, time);
    }
    handleLightKickState(time) {
      if (this.animationFrame < 2) return;
      if (isLightKick(this.playerId))
        this.handleLightAttackReset(time);
      if (!this.isAnimationCompleted()) return;
      this.changeState(FighterState.IDLE, time);
    }
    handleMediumKickState(time) {
      if (!this.isAnimationCompleted()) return;
      this.changeState(FighterState.IDLE, time);
    }
    handleHurtState(time) {
      if (!this.isAnimationCompleted()) return;
      this.hurtShake = 0;
      this.hurtShakeTimer = 0;
      this.hurtBy = void 0;
      this.changeState(FighterState.IDLE, time);
    }
    handleAttackHit(time, attackStrength, attackType, hitPosition, hurtLocation, hurtBy) {
      const newState = this.getHurtState(attackStrength, hurtLocation);
      const { velocity, friction } = FighterAttackBaseData[attackStrength].slide;
      this.hurtBy = hurtBy;
      this.slideVelocity = velocity;
      this.slideFriction = friction;
      this.attackStruck = true;
      playSound(this.soundHits[attackStrength][attackType], 0.09);
      this.onAttackHit(
        time,
        this.opponent.playerId,
        this.playerId,
        hitPosition,
        attackStrength
      );
      this.changeState(newState, time);
      if (!ENABLE_DEBUG) return;
      logHit(this.opponent, attackStrength, hurtLocation);
    }
    // Balance FPS & animate frames
    updateAnimation(time) {
      const animation = this.animations[this.currentState];
      if (animation[this.animationFrame][1] <= FrameDelay.FREEZE || time.previous <= this.animationTimer)
        return;
      this.setAnimationFrame(this.animationFrame + 1, time);
    }
    updateStageConstraints(time, context, camera) {
      if (this.position.x > camera.position.x + SCREEN_WIDTH - this.boxes.push.width) {
        this.position.x = camera.position.x + SCREEN_WIDTH - this.boxes.push.width;
        this.resetSlide(true);
      }
      if (this.position.x < camera.position.x + this.boxes.push.width) {
        this.position.x = camera.position.x + this.boxes.push.width;
        this.resetSlide(true);
      }
      if (this.hasCollidedWithOpponent()) {
        if (this.position.x <= this.opponent.position.x) {
          this.position.x = Math.max(
            this.opponent.position.x + this.opponent.boxes.push.x - (this.boxes.push.x + this.boxes.push.width),
            camera.position.x + this.boxes.push.width
          );
          if ([
            FighterState.IDLE,
            FighterState.CROUCH,
            FighterState.JUMP_UP,
            FighterState.JUMP_FORWARD,
            FighterState.JUMP_BACKWARD
          ].includes(this.opponent.currentState)) {
            this.opponent.position.x += PUSH_FRICTION * time.secondsPassed;
          }
        }
        if (this.position.x >= this.opponent.position.x) {
          this.position.x = Math.min(
            this.opponent.position.x + this.opponent.boxes.push.x + this.opponent.boxes.push.width + (this.boxes.push.width + this.boxes.push.x),
            camera.position.x + SCREEN_WIDTH - this.boxes.push.width
          );
          if ([
            FighterState.IDLE,
            FighterState.CROUCH,
            FighterState.JUMP_UP,
            FighterState.JUMP_FORWARD,
            FighterState.JUMP_BACKWARD
          ].includes(this.opponent.currentState)) {
            this.opponent.position.x -= PUSH_FRICTION * time.secondsPassed;
          }
        }
      }
    }
    updateHitBoxCollided(time) {
      const { attackStrength, attackType } = this.states[this.currentState];
      if (!attackType || this.attackStruck) return;
      const actualHitBox = getActualBoxDimensions(
        this.position,
        this.direction,
        this.boxes.hit
      );
      for (const [hurtLocation, hurtBox] of Object.entries(
        this.opponent.boxes.hurt
      )) {
        const [x, y, width, height] = hurtBox;
        const actualOpponentHurtBox = getActualBoxDimensions(
          this.opponent.position,
          this.opponent.direction,
          { x, y, width, height }
        );
        if (!boxOverlap(actualHitBox, actualOpponentHurtBox)) return;
        stopSound(this.soundAttacks[attackStrength]);
        const hitPosition = {
          x: actualHitBox.x + actualHitBox.width / 2 + actualOpponentHurtBox.x + actualOpponentHurtBox.width / 2 / 2,
          y: actualHitBox.y + actualHitBox.height / 2 + actualOpponentHurtBox.y + actualOpponentHurtBox.height / 2 / 2
        };
        hitPosition.x -= 4 - Math.random() * 8;
        hitPosition.y -= 4 - Math.random() * 8;
        this.opponent.handleAttackHit(
          time,
          attackStrength,
          attackType,
          hitPosition,
          hurtLocation,
          FighterHurtBy.FIGHTER
        );
        return;
      }
    }
    updateHurtShake(time, delay) {
      if (this.hurtShakeTimer === 0 || time.previous <= this.hurtShakeTimer)
        return;
      const shakeAmount = delay - time.previous < FIGHTER_HURT_DELAY * FRAME_TIME / 2 ? 1 : 2;
      this.hurtShake = shakeAmount - this.hurtShake;
      this.hurtShakeTimer = time.previous + FRAME_TIME;
    }
    updateSlide(time) {
      if (this.slideVelocity >= 0) return;
      this.slideVelocity += this.slideFriction * time.secondsPassed;
      if (this.slideVelocity < 0) {
        setTimeout(() => {
          this.resetSlide();
        }, FIGHTER_HURT_DELAY * FRAME_TIME);
      }
    }
    updateSpecialMoves(time) {
      for (const specialMove of this.specialMoves) {
        const resultArgs = hasSpecialMoveBeenExecuted(
          specialMove,
          this.playerId,
          time
        );
        if (resultArgs)
          this.changeState(specialMove.state, time, resultArgs);
      }
    }
    updatePosition(time) {
      this.position.x += (this.velocity.x + this.slideVelocity) * this.direction * time.secondsPassed;
      this.position.y += this.velocity.y * time.secondsPassed;
    }
    update(time, context, camera) {
      this.states[this.currentState].update(time, context);
      this.updateSpecialMoves(time);
      this.updateSlide(time);
      this.updatePosition(time);
      this.updateAnimation(time);
      this.updateStageConstraints(time, context, camera);
      this.updateHitBoxCollided(time);
    }
    draw(context, camera) {
      const [frameKey] = this.animations[this.currentState][this.animationFrame];
      const [[[x, y, width, height], [originX, originY]]] = this.frames.get(frameKey);
      context.scale(this.direction, 1);
      context.drawImage(
        this.image,
        x,
        y,
        width,
        height,
        Math.floor(
          (this.position.x - this.hurtShake - camera.position.x) * this.direction
        ) - originX,
        Math.floor(this.position.y - camera.position.y) - originY,
        width,
        height
      );
      context.setTransform(1, 0, 0, 1, 0, 0);
      if (!ENABLE_DEBUG) return;
      drawCollisionInfo(this, context, camera);
    }
  };

  // src/constants/fireball.js
  var FireballState = {
    ACTIVE: "active",
    COLLIDED: "collided"
  };
  var FireballCollidedState = {
    NONE: "none",
    OPPONENT: "opponent",
    FIREBALL: "fireball"
  };
  var FireballVelocity = {
    [Control.LIGHT_PUNCH]: 150,
    [Control.MEDIUM_PUNCH]: 220,
    [Control.HEAVY_PUNCH]: 300
  };

  // src/entities/fighters/special/Fireball.js
  var frames = /* @__PURE__ */ new Map([
    ["hadouken-fireball-1", [[[400, 2756, 43, 32], [25, 16]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ["hadouken-fireball-2", [[[460, 2761, 56, 28], [37, 14]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ["hadouken-fireball-3", [[[0, 0, 0, 0], [0, 0]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ["hadouken-collide-1", [[[543, 2767, 26, 20], [13, 10]], [0, 0, 0, 0]]],
    ["hadouken-collide-2", [[[590, 2766, 15, 25], [9, 13]], [0, 0, 0, 0]]],
    ["hadouken-collide-3", [[[625, 2764, 28, 28], [26, 14]], [0, 0, 0, 0]]]
  ]);
  var animations = {
    [FireballState.ACTIVE]: [
      ["hadouken-fireball-1", 2],
      ["hadouken-fireball-3", 2],
      ["hadouken-fireball-2", 2],
      ["hadouken-fireball-3", 2]
    ],
    [FireballState.COLLIDED]: [
      ["hadouken-collide-1", 9],
      ["hadouken-collide-2", 5],
      ["hadouken-collide-3", 9]
    ]
  };
  var Fireball = class _Fireball {
    image = document.querySelector('img[alt="ken"]');
    animationFrame = 0;
    state = FireballState.ACTIVE;
    constructor(args, time, entityList) {
      const [fighter, strength] = args;
      this.fighter = fighter;
      this.entityList = entityList;
      this.velocity = FireballVelocity[strength];
      this.direction = this.fighter.direction;
      this.position = {
        x: this.fighter.position.x + 76 * this.direction,
        y: this.fighter.position.y - 57
      };
      this.animationTimer = time.previous;
    }
    hasCollidedWithOpponent(hitbox) {
      for (const [, hurtBox] of Object.entries(
        this.fighter.opponent.boxes.hurt
      )) {
        const [x, y, width, height] = hurtBox;
        const actualOpponentHurtBox = getActualBoxDimensions(
          this.fighter.opponent.position,
          this.fighter.opponent.direction,
          { x, y, width, height }
        );
        if (boxOverlap(hitbox, actualOpponentHurtBox))
          return FireballCollidedState.OPPONENT;
      }
    }
    hasCollidedWithOtherFireball(hitbox) {
      const otherFireballs = this.entityList.entities.filter(
        (fireball) => fireball instanceof _Fireball && fireball !== this
      );
      if (otherFireballs.length === 0) return;
      for (const fireball of otherFireballs) {
        const [x, y, width, height] = frames.get(
          animations[fireball.state][fireball.animationFrame][0]
        )[1];
        const otherActualHitBox = getActualBoxDimensions(
          fireball.position,
          fireball.direction,
          { x, y, width, height }
        );
        if (boxOverlap(hitbox, otherActualHitBox))
          return FireballCollidedState.FIREBALL;
      }
    }
    hasCollided() {
      const [x, y, width, height] = frames.get(
        animations[this.state][this.animationFrame][0]
      )[1];
      const actualHitBox = getActualBoxDimensions(
        this.position,
        this.direction,
        { x, y, width, height }
      );
      return this.hasCollidedWithOpponent(actualHitBox) ?? this.hasCollidedWithOtherFireball(actualHitBox);
    }
    updateMovement(time, camera) {
      if (this.state !== FireballState.ACTIVE) return;
      this.position.x += this.velocity * this.direction * time.secondsPassed;
      if (this.position.x - camera.position.x > SCREEN_WIDTH + 56 || this.position.x - camera.position.x < -56) {
        this.entityList.remove(this);
      }
      const hasCollided = this.hasCollided();
      if (!hasCollided) return;
      this.state = FireballState.COLLIDED;
      this.animationFrame = 0;
      this.animationTimer = time.previous + animations[this.state][this.animationFrame][1] * FRAME_TIME;
      if (hasCollided !== FireballCollidedState.OPPONENT) return;
      this.fighter.opponent.handleAttackHit(
        time,
        FighterAttackStrength.HEAVY,
        FighterAttackType.PUNCH,
        void 0,
        FighterHurtBox.HEAD,
        FighterHurtBy.FIREBALL
      );
    }
    updateAnimation(time) {
      if (time.previous < this.animationTimer) return;
      this.animationFrame += 1;
      if (this.animationFrame >= animations[this.state].length) {
        this.animationFrame = 0;
        if (this.state === FireballState.COLLIDED)
          this.entityList.remove(this);
      }
      this.animationTimer = time.previous + animations[this.state][this.animationFrame][1] * FRAME_TIME;
    }
    update(time, _, camera) {
      this.updateMovement(time, camera);
      this.updateAnimation(time);
    }
    draw(context, camera) {
      const [frameKey] = animations[this.state][this.animationFrame];
      const [
        [[frameX, frameY, frameWidth, frameHeight], [originX, originY]],
        collisionDimensions
      ] = frames.get(frameKey);
      context.scale(this.direction, 1);
      context.drawImage(
        this.image,
        frameX,
        frameY,
        frameWidth,
        frameHeight,
        Math.floor(
          (this.position.x - camera.position.x) * this.direction - originX
        ),
        Math.floor(this.position.y - camera.position.y - originY),
        frameWidth,
        frameHeight
      );
      context.setTransform(1, 0, 0, 1, 0, 0);
      if (!ENABLE_DEBUG) return;
      drawBox(
        context,
        camera,
        this.position,
        this.direction,
        collisionDimensions,
        "#FF0000"
      );
      drawCross(context, camera, this.position, "#FFF");
    }
  };

  // src/entities/fighters/Ken.js
  var Ken = class extends Fighter {
    image = document.querySelector('img[alt="ken"]');
    voiceHadouken = document.querySelector("audio#sound-ken-voice-hadouken");
    // prettier-ignore
    frames = /* @__PURE__ */ new Map([
      // Idle Stance
      ["idle-1", [[[346, 688, 60, 89], [34, 86]], PushBox.IDLE, HurtBox.IDLE]],
      ["idle-2", [[[2, 687, 59, 90], [33, 87]], PushBox.IDLE, HurtBox.IDLE]],
      ["idle-3", [[[72, 685, 58, 92], [32, 89]], PushBox.IDLE, HurtBox.IDLE]],
      ["idle-4", [[[142, 684, 55, 93], [31, 90]], PushBox.IDLE, HurtBox.IDLE]],
      // Move Forwards
      ["forwards-1", [[[8, 872, 53, 83], [27, 81]], PushBox.IDLE, HurtBox.FORWARD]],
      ["forwards-2", [[[70, 867, 60, 88], [35, 86]], PushBox.IDLE, HurtBox.FORWARD]],
      ["forwards-3", [[[140, 866, 64, 90], [35, 87]], PushBox.IDLE, HurtBox.FORWARD]],
      ["forwards-4", [[[215, 865, 63, 89], [29, 88]], PushBox.IDLE, HurtBox.FORWARD]],
      ["forwards-5", [[[288, 866, 54, 89], [25, 87]], PushBox.IDLE, HurtBox.FORWARD]],
      ["forwards-6", [[[357, 867, 50, 89], [25, 86]], PushBox.IDLE, HurtBox.FORWARD]],
      // Move Backwards
      ["backwards-1", [[[417, 868, 61, 87], [35, 85]], PushBox.IDLE, HurtBox.BACKWARD]],
      ["backwards-2", [[[487, 866, 59, 90], [36, 87]], PushBox.IDLE, HurtBox.BACKWARD]],
      ["backwards-3", [[[558, 865, 57, 90], [36, 88]], PushBox.IDLE, HurtBox.BACKWARD]],
      ["backwards-4", [[[629, 864, 58, 90], [38, 89]], PushBox.IDLE, HurtBox.BACKWARD]],
      ["backwards-5", [[[702, 865, 58, 91], [36, 88]], PushBox.IDLE, HurtBox.BACKWARD]],
      ["backwards-6", [[[773, 866, 57, 89], [36, 87]], PushBox.IDLE, HurtBox.BACKWARD]],
      // Jump Up
      ["jump-up-1", [[[724, 1036, 56, 104], [32, 107]], PushBox.JUMP, HurtBox.JUMP]],
      ["jump-up-2", [[[792, 995, 50, 89], [25, 103]], PushBox.JUMP, HurtBox.JUMP]],
      ["jump-up-3", [[[853, 967, 54, 77], [25, 103]], PushBox.JUMP, HurtBox.JUMP]],
      ["jump-up-4", [[[911, 966, 48, 70], [28, 101]], PushBox.JUMP, HurtBox.JUMP]],
      ["jump-up-5", [[[975, 977, 48, 86], [25, 103]], PushBox.JUMP, HurtBox.JUMP]],
      ["jump-up-6", [[[1031, 1008, 55, 103], [32, 107]], PushBox.JUMP, HurtBox.JUMP]],
      // Jump Forwards/Backwards
      ["jump-roll-1", [[[1237, 1037, 55, 103], [25, 106]], PushBox.JUMP, [[-11, -106, 24, 16], [-26, -90, 40, 42], [-26, -31, 40, 32]]]],
      ["jump-roll-2", [[[1301, 990, 61, 78], [22, 90]], PushBox.JUMP, [[17, -90, 24, 16], [-14, -91, 40, 42], [-22, -66, 38, 18]]]],
      ["jump-roll-3", [[[1363, 994, 104, 42], [61, 76]], PushBox.JUMP, [[22, -51, 24, 16], [-14, -81, 40, 42], [-22, -66, 38, 18]]]],
      ["jump-roll-4", [[[1468, 957, 53, 82], [42, 111]], PushBox.JUMP, [[-39, -46, 24, 16], [-30, -88, 40, 42], [-34, -118, 44, 48]]]],
      ["jump-roll-5", [[[1541, 988, 122, 44], [71, 81]], PushBox.JUMP, [[-72, -56, 24, 16], [-54, -77, 52, 40], [-14, -82, 48, 34]]]],
      ["jump-roll-6", [[[1664, 976, 71, 87], [53, 98]], PushBox.JUMP, [[-55, -100, 24, 16], [-48, -87, 44, 38], [-22, -66, 38, 18]]]],
      // Jump first/last frame
      ["jump-land", [[[660, 1060, 55, 85], [29, 83]], PushBox.IDLE, HurtBox.IDLE]],
      // Crouch
      ["crouch-1", [[[8, 779, 53, 83], [27, 81]], PushBox.IDLE, HurtBox.IDLE]],
      ["crouch-2", [[[79, 794, 57, 69], [25, 66]], PushBox.BEND, HurtBox.BEND]],
      ["crouch-3", [[[148, 802, 61, 61], [25, 58]], PushBox.CROUCH, HurtBox.CROUCH]],
      // Idle Turn
      ["idle-turn-1", [[[420, 682, 54, 95], [29, 92]], PushBox.IDLE, [[-10, -89, 28, 18], [-14, -74, 40, 42], [-14, -31, 40, 32]]]],
      ["idle-turn-2", [[[488, 678, 58, 98], [30, 95]], PushBox.IDLE, [[-16, -96, 28, 18], [-14, -74, 40, 42], [-14, -31, 40, 32]]]],
      ["idle-turn-3", [[[560, 683, 54, 94], [27, 90]], PushBox.IDLE, [[-16, -96, 28, 18], [-14, -74, 40, 42], [-14, -31, 40, 32]]]],
      // Crouch Turn
      ["crouch-turn-1", [[[356, 802, 53, 61], [26, 58]], PushBox.CROUCH, [[-7, -60, 24, 18], [-28, -46, 44, 24], [-28, -24, 44, 24]]]],
      ["crouch-turn-2", [[[424, 802, 52, 61], [27, 58]], PushBox.CROUCH, [[-7, -60, 24, 18], [-28, -46, 44, 24], [-28, -24, 44, 24]]]],
      ["crouch-turn-3", [[[486, 802, 53, 61], [29, 58]], PushBox.CROUCH, [[-26, -61, 24, 18], [-28, -46, 44, 24], [-28, -24, 44, 24]]]],
      // Light Punch
      ["light-punch-1", [[[3, 1152, 64, 91], [32, 88]], PushBox.IDLE, HurtBox.IDLE]],
      ["light-punch-2", [[[72, 1152, 92, 91], [32, 88]], PushBox.IDLE, HurtBox.IDLE, [11, -85, 50, 18]]],
      // Medium/Heavy Punch
      ["med-punch-1", [[[517, 1149, 60, 94], [28, 91]], PushBox.IDLE, HurtBox.IDLE]],
      ["med-punch-2", [[[650, 1148, 74, 95], [29, 92]], PushBox.IDLE, HurtBox.PUNCH]],
      ["med-punch-3", [[[736, 1148, 108, 94], [24, 92]], PushBox.IDLE, HurtBox.PUNCH, [17, -85, 68, 14]]],
      // Heavy Punch
      ["heavy-punch-1", [[[736, 1148, 108, 94], [24, 92]], PushBox.IDLE, HurtBox.PUNCH, [17, -85, 76, 14]]],
      // Light/Medium Kick
      ["light-kick-1", [[[62, 1565, 66, 92], [46, 93]], PushBox.IDLE, [[-33, -96, 30, 18], [-41, -79, 42, 38], [-32, -52, 44, 50]]]],
      ["light-kick-2", [[[143, 1565, 114, 92], [68, 93]], PushBox.IDLE, [[-65, -96, 30, 18], [-57, -79, 42, 38], [-32, -52, 44, 50]], [-17, -98, 66, 28]]],
      // Medium Kick
      ["med-kick-1", [[[143, 1565, 114, 92], [68, 93]], PushBox.IDLE, [[-65, -96, 30, 18], [-57, -79, 42, 38], [-32, -52, 44, 50]], [-18, -98, 80, 28]]],
      // Heavy Kick
      ["heavy-kick-1", [[[683, 1575, 61, 90], [37, 87]], PushBox.IDLE, [[-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]]]],
      ["heavy-kick-2", [[[763, 1567, 95, 94], [44, 91]], PushBox.IDLE, [[12, -90, 34, 34], [-25, -78, 42, 42], [-11, -50, 42, 50]], [15, -99, 40, 32]]],
      ["heavy-kick-3", [[[870, 1567, 120, 94], [42, 91]], PushBox.IDLE, [[13, -91, 62, 34], [-25, -78, 42, 42], [-11, -50, 42, 50]], [21, -97, 62, 24]]],
      ["heavy-kick-4", [[[1005, 1584, 101, 77], [39, 74]], PushBox.IDLE, [[-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]]]],
      ["heavy-kick-5", [[[1147, 1580, 64, 81], [38, 78]], PushBox.IDLE, [[-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]]]],
      // Hit Face
      ["hit-face-1", [[[325, 3275, 62, 91], [41, 88]], PushBox.IDLE, [[-25, -89, 20, 20], [-33, -74, 40, 46], [-30, -37, 40, 38]]]],
      ["hit-face-2", [[[400, 3279, 68, 88], [47, 85]], PushBox.IDLE, [[-42, -88, 20, 20], [-46, -74, 40, 46], [-33, -37, 40, 38]]]],
      ["hit-face-3", [[[484, 3279, 73, 88], [54, 85]], PushBox.IDLE, [[-52, -87, 20, 20], [-53, -71, 40, 46], [-33, -37, 40, 38]]]],
      ["hit-face-4", [[[575, 3274, 83, 93], [58, 90]], PushBox.IDLE, [[-57, -88, 20, 20], [-53, -71, 40, 46], [-33, -37, 40, 38]]]],
      // Hit Stomach
      ["hit-stomach-1", [[[1, 3279, 58, 85], [37, 83]], PushBox.IDLE, [[-15, -85, 28, 18], [-31, -69, 42, 42], [-30, -34, 42, 34]]]],
      ["hit-stomach-2", [[[74, 3282, 66, 82], [41, 80]], PushBox.IDLE, [[-17, 82, 28, 18], [-33, -65, 38, 36], [-34, -34, 42, 34]]]],
      ["hit-stomach-3", [[[149, 3287, 71, 78], [47, 75]], PushBox.IDLE, [[-17, 82, 28, 18], [-41, -59, 38, 30], [-34, -34, 42, 34]]]],
      ["hit-stomach-4", [[[231, 3293, 75, 72], [50, 69]], PushBox.IDLE, [[-28, -67, 28, 18], [-41, -59, 38, 30], [-40, -34, 42, 34]]]],
      // Stunned
      ["stun-1", [[[149, 3370, 77, 87], [28, 85]], PushBox.IDLE, [[8, -87, 28, 18], [-16, -75, 40, 46], [-26, -31, 40, 32]]]],
      ["stun-2", [[[77, 3368, 65, 89], [28, 87]], PushBox.IDLE, [[-9, -89, 28, 18], [-23, -75, 40, 46], [-26, -31, 40, 32]]]],
      ["stun-3", [[[1, 3367, 67, 90], [35, 88]], PushBox.IDLE, [[-22, -91, 28, 18], [-30, -72, 42, 40], [-26, -31, 40, 32]]]],
      // Hadouken
      ["special-1", [[[3, 2741, 74, 90], [28, 89]], PushBox.IDLE, HurtBox.IDLE]],
      ["special-2", [[[91, 2747, 85, 83], [25, 83]], PushBox.IDLE, HurtBox.IDLE]],
      ["special-3", [[[188, 2750, 90, 81], [25, 80]], PushBox.IDLE, HurtBox.PUNCH]],
      ["special-4", [[[293, 2754, 106, 77], [23, 76]], PushBox.IDLE, [[38, -79, 26, 18], [21, -65, 40, 38], [-12, -30, 78, 30]]]],
      // Winner Pose
      ["winner-pose-1", [[[1, 3631, 53, 83], [28, 80]], PushBox.IDLE, HurtBox.IDLE]],
      ["winner-pose-2", [[[71, 3625, 60, 89], [29, 86]], PushBox.IDLE, HurtBox.IDLE]],
      ["winner-pose-3", [[[140, 3617, 60, 97], [29, 95]], PushBox.IDLE, HurtBox.IDLE]],
      ["winner-pose-4", [[[207, 3601, 57, 113], [29, 110]], PushBox.IDLE, HurtBox.IDLE]],
      ["winner-pose-5", [[[344, 3622, 61, 94], [26, 92]], PushBox.IDLE, HurtBox.IDLE]]
    ]);
    animations = {
      [FighterState.IDLE]: [
        ["idle-1", 4],
        ["idle-2", 4],
        ["idle-3", 4],
        ["idle-4", 4],
        ["idle-3", 4],
        ["idle-2", 4]
      ],
      [FighterState.WALK_FORWARD]: [
        ["forwards-1", 3],
        ["forwards-2", 6],
        ["forwards-3", 4],
        ["forwards-4", 4],
        ["forwards-5", 4],
        ["forwards-6", 6]
      ],
      [FighterState.WALK_BACKWARD]: [
        ["backwards-1", 3],
        ["backwards-2", 6],
        ["backwards-3", 4],
        ["backwards-4", 4],
        ["backwards-5", 4],
        ["backwards-6", 6]
      ],
      [FighterState.JUMP_START]: [
        ["jump-land", 3],
        ["jump-land", FrameDelay.TRANSITION]
      ],
      [FighterState.JUMP_UP]: [
        ["jump-up-1", 8],
        ["jump-up-2", 8],
        ["jump-up-3", 8],
        ["jump-up-4", 8],
        ["jump-up-5", 8],
        ["jump-up-6", FrameDelay.TRANSITION]
      ],
      [FighterState.JUMP_FORWARD]: [
        ["jump-roll-1", 13],
        ["jump-roll-2", 5],
        ["jump-roll-3", 3],
        ["jump-roll-4", 3],
        ["jump-roll-5", 3],
        ["jump-roll-6", 5],
        ["jump-roll-6", FrameDelay.FREEZE]
      ],
      [FighterState.JUMP_BACKWARD]: [
        ["jump-roll-6", 15],
        ["jump-roll-5", 3],
        ["jump-roll-4", 3],
        ["jump-roll-3", 3],
        ["jump-roll-2", 3],
        ["jump-roll-1", FrameDelay.FREEZE]
      ],
      [FighterState.JUMP_LAND]: [
        ["jump-land", 2],
        ["jump-land", 5],
        ["jump-land", FrameDelay.TRANSITION]
      ],
      [FighterState.CROUCH]: [["crouch-3", FrameDelay.FREEZE]],
      [FighterState.CROUCH_DOWN]: [
        ["crouch-1", 2],
        ["crouch-2", 2],
        ["crouch-3", 2],
        ["crouch-3", FrameDelay.TRANSITION]
      ],
      [FighterState.CROUCH_UP]: [
        ["crouch-3", 2],
        ["crouch-2", 2],
        ["crouch-1", 2],
        ["crouch-1", FrameDelay.TRANSITION]
      ],
      [FighterState.IDLE_TURN]: [
        ["idle-turn-3", 2],
        ["idle-turn-2", 2],
        ["idle-turn-1", 2],
        ["idle-turn-1", FrameDelay.TRANSITION]
      ],
      [FighterState.CROUCH_TURN]: [
        ["crouch-turn-3", 2],
        ["crouch-turn-2", 2],
        ["crouch-turn-1", 2],
        ["crouch-turn-1", FrameDelay.TRANSITION]
      ],
      [FighterState.LIGHT_PUNCH]: [
        ["light-punch-1", 2],
        ["light-punch-2", 4],
        ["light-punch-1", 4],
        ["light-punch-1", FrameDelay.TRANSITION]
      ],
      [FighterState.MEDIUM_PUNCH]: [
        ["med-punch-1", 1],
        ["med-punch-2", 2],
        ["med-punch-3", 4],
        ["med-punch-2", 3],
        ["med-punch-1", 3],
        ["med-punch-1", FrameDelay.TRANSITION]
      ],
      [FighterState.HEAVY_PUNCH]: [
        ["med-punch-1", 3],
        ["med-punch-2", 2],
        ["heavy-punch-1", 6],
        ["med-punch-2", 6],
        ["med-punch-1", 12],
        ["med-punch-1", FrameDelay.TRANSITION]
      ],
      [FighterState.LIGHT_KICK]: [
        ["med-punch-1", 3],
        ["light-kick-1", 3],
        ["light-kick-2", 8],
        ["light-kick-1", 4],
        ["med-punch-1", 1],
        ["med-punch-1", FrameDelay.TRANSITION]
      ],
      [FighterState.MEDIUM_KICK]: [
        ["med-punch-1", 5],
        ["light-kick-1", 6],
        ["med-kick-1", 12],
        ["light-kick-1", 7],
        ["light-kick-1", FrameDelay.TRANSITION]
      ],
      [FighterState.HEAVY_KICK]: [
        ["heavy-kick-1", 2],
        ["heavy-kick-2", 4],
        ["heavy-kick-3", 8],
        ["heavy-kick-4", 10],
        ["heavy-kick-5", 7],
        ["heavy-kick-5", FrameDelay.TRANSITION]
      ],
      [FighterState.HURT_HEAD_LIGHT]: [
        ["hit-face-1", FIGHTER_HURT_DELAY],
        ["hit-face-1", 3],
        ["hit-face-2", 4],
        ["hit-face-3", 9],
        ["hit-face-3", FrameDelay.TRANSITION]
      ],
      [FighterState.HURT_HEAD_MEDIUM]: [
        ["hit-face-1", FIGHTER_HURT_DELAY],
        ["hit-face-1", 3],
        ["hit-face-2", 4],
        ["hit-face-3", 9],
        ["hit-face-3", FrameDelay.TRANSITION]
      ],
      [FighterState.HURT_HEAD_HEAVY]: [
        ["hit-face-3", FIGHTER_HURT_DELAY],
        ["hit-face-3", 7],
        ["hit-face-4", 4],
        ["stun-3", 9],
        ["stun-3", FrameDelay.TRANSITION]
      ],
      [FighterState.HURT_BODY_LIGHT]: [
        ["hit-stomach-1", FIGHTER_HURT_DELAY],
        ["hit-stomach-1", 11],
        ["hit-stomach-1", FrameDelay.TRANSITION]
      ],
      [FighterState.HURT_BODY_MEDIUM]: [
        ["hit-stomach-1", FIGHTER_HURT_DELAY],
        ["hit-stomach-1", 7],
        ["hit-stomach-2", 9],
        ["hit-stomach-2", FrameDelay.TRANSITION]
      ],
      [FighterState.HURT_BODY_HEAVY]: [
        ["hit-stomach-2", FIGHTER_HURT_DELAY],
        ["hit-stomach-2", 3],
        ["hit-stomach-3", 4],
        ["hit-stomach-4", 4],
        ["stun-3", 9],
        ["stun-3", FrameDelay.TRANSITION]
      ],
      [FighterState.SPECIAL_1]: [
        ["special-1", 2],
        ["special-2", 8],
        ["special-3", 2],
        ["special-4", 40],
        ["special-4", FrameDelay.TRANSITION]
      ],
      [FighterState.WINNER_POSE]: [
        ["winner-pose-1", 12],
        ["winner-pose-2", 10],
        ["winner-pose-3", 10],
        ["winner-pose-4", 50],
        ["winner-pose-3", 8],
        ["winner-pose-2", 8],
        ["winner-pose-5", FrameDelay.TRANSITION]
      ]
    };
    initialVelocity = {
      x: {
        [FighterState.WALK_FORWARD]: 3 * 60,
        [FighterState.WALK_BACKWARD]: -(2 * 60),
        [FighterState.JUMP_FORWARD]: 48 * 3 + 12 * 2,
        [FighterState.JUMP_BACKWARD]: -(45 * 4 + 15 * 3)
      },
      jump: -420
    };
    specialMoves = [
      {
        state: FighterState.SPECIAL_1,
        sequence: [
          SpecialMoveDirection.DOWN,
          SpecialMoveDirection.FORWARD_DOWN,
          SpecialMoveDirection.FORWARD,
          SpecialMoveButton.ANY_PUNCH
        ],
        cursor: 0
      }
    ];
    gravity = 1e3;
    fireball = { fired: false, strength: void 0 };
    constructor(playerId, onAttackHit, entityList) {
      super({ playerId, onAttackHit });
      this.entityList = entityList;
      this.states[FighterState.SPECIAL_1] = {
        init: this.handleHadoukenInit.bind(this),
        update: this.handleHadoukenState.bind(this),
        shadow: [1.6, 1, 22, 0],
        validFrom: [
          FighterState.IDLE,
          FighterState.WALK_FORWARD,
          FighterState.IDLE_TURN,
          FighterState.CROUCH,
          FighterState.CROUCH_DOWN,
          FighterState.CROUCH_UP,
          FighterState.CROUCH_TURN
        ]
      };
      this.states[FighterState.IDLE].validFrom.push(FighterState.SPECIAL_1);
    }
    handleHadoukenInit(_, strength) {
      this.resetVelocities();
      playSound(this.voiceHadouken, 0.09);
      this.fireball = { fired: false, strength };
    }
    handleHadoukenState(time) {
      if (!this.fireball.fired && this.animationFrame === 3) {
        this.fireball.fired = true;
        this.entityList.add.call(
          this.entityList,
          Fireball,
          time,
          this,
          this.fireball.strength
        );
      }
      if (!this.isAnimationCompleted()) return;
      this.changeState(FighterState.IDLE, time);
    }
  };

  // src/entities/fighters/Ryu.js
  var Ryu = class extends Fighter {
    image = document.querySelector('img[alt="ryu"]');
    voiceHadouken = document.querySelector("audio#sound-ryu-voice-hadouken");
    // prettier-ignore
    frames = /* @__PURE__ */ new Map([
      // Idle Stance
      ["idle-1", [[[75, 14, 60, 89], [34, 86]], PushBox.IDLE, HurtBox.IDLE]],
      ["idle-2", [[[7, 14, 59, 90], [33, 87]], PushBox.IDLE, HurtBox.IDLE]],
      ["idle-3", [[[277, 11, 58, 92], [32, 89]], PushBox.IDLE, HurtBox.IDLE]],
      ["idle-4", [[[211, 10, 55, 93], [31, 90]], PushBox.IDLE, HurtBox.IDLE]],
      // Move Forwards
      ["forwards-1", [[[9, 136, 53, 83], [27, 81]], PushBox.IDLE, HurtBox.FORWARD]],
      ["forwards-2", [[[78, 131, 60, 89], [35, 86]], PushBox.IDLE, HurtBox.FORWARD]],
      ["forwards-3", [[[152, 128, 64, 92], [35, 89]], PushBox.IDLE, HurtBox.FORWARD]],
      ["forwards-4", [[[229, 130, 63, 90], [29, 89]], PushBox.IDLE, HurtBox.FORWARD]],
      ["forwards-5", [[[307, 128, 54, 91], [25, 89]], PushBox.IDLE, HurtBox.FORWARD]],
      ["forwards-6", [[[371, 128, 50, 89], [25, 86]], PushBox.IDLE, HurtBox.FORWARD]],
      // Move Backwards
      ["backwards-1", [[[777, 128, 61, 87], [35, 85]], PushBox.IDLE, HurtBox.BACKWARD]],
      ["backwards-2", [[[430, 124, 59, 90], [36, 87]], PushBox.IDLE, HurtBox.BACKWARD]],
      ["backwards-3", [[[495, 124, 57, 90], [36, 88]], PushBox.IDLE, HurtBox.BACKWARD]],
      ["backwards-4", [[[559, 124, 58, 90], [38, 89]], PushBox.IDLE, HurtBox.BACKWARD]],
      ["backwards-5", [[[631, 125, 58, 91], [36, 88]], PushBox.IDLE, HurtBox.BACKWARD]],
      ["backwards-6", [[[707, 126, 57, 89], [36, 87]], PushBox.IDLE, HurtBox.BACKWARD]],
      // Jump Up
      ["jump-up-1", [[[67, 244, 56, 104], [32, 107]], PushBox.JUMP, HurtBox.JUMP]],
      ["jump-up-2", [[[138, 233, 50, 89], [25, 103]], PushBox.JUMP, HurtBox.JUMP]],
      ["jump-up-3", [[[197, 233, 54, 77], [25, 103]], PushBox.JUMP, HurtBox.JUMP]],
      ["jump-up-4", [[[259, 240, 48, 70], [28, 101]], PushBox.JUMP, HurtBox.JUMP]],
      ["jump-up-5", [[[319, 234, 48, 89], [25, 106]], PushBox.JUMP, HurtBox.JUMP]],
      ["jump-up-6", [[[375, 244, 55, 109], [31, 113]], PushBox.JUMP, HurtBox.JUMP]],
      // Jump Forwards/Backwards
      ["jump-roll-1", [[[882, 261, 55, 109], [25, 106]], PushBox.JUMP, [[-11, -106, 24, 16], [-26, -90, 40, 42], [-26, -31, 40, 32]]]],
      ["jump-roll-2", [[[442, 261, 61, 78], [22, 90]], PushBox.JUMP, [[17, -90, 24, 16], [-14, -91, 40, 42], [-22, -66, 38, 18]]]],
      ["jump-roll-3", [[[507, 259, 104, 42], [61, 76]], PushBox.JUMP, [[22, -51, 24, 16], [-14, -81, 40, 42], [-22, -66, 38, 18]]]],
      ["jump-roll-4", [[[617, 240, 53, 82], [42, 111]], PushBox.JUMP, [[-39, -46, 24, 16], [-30, -88, 40, 42], [-34, -118, 44, 48]]]],
      ["jump-roll-5", [[[676, 257, 122, 44], [71, 81]], PushBox.JUMP, [[-72, -56, 24, 16], [-54, -77, 52, 40], [-14, -82, 48, 34]]]],
      ["jump-roll-6", [[[804, 258, 71, 87], [53, 98]], PushBox.JUMP, [[-55, -56, 24, 16], [-48, -87, 44, 38], [-22, -66, 38, 18]]]],
      // Jump first/last frame
      ["jump-land", [[[7, 268, 55, 85], [29, 83]], PushBox.IDLE, HurtBox.IDLE]],
      // Crouch
      ["crouch-1", [[[551, 21, 53, 83], [27, 81]], PushBox.IDLE, HurtBox.IDLE]],
      ["crouch-2", [[[611, 36, 57, 69], [25, 66]], PushBox.BEND, HurtBox.BEND]],
      ["crouch-3", [[[679, 44, 61, 61], [25, 58]], PushBox.CROUCH, HurtBox.CROUCH]],
      // Idle Turn
      ["idle-turn-1", [[[348, 8, 54, 95], [29, 92]], PushBox.IDLE, [[-10, -89, 28, 18], [-14, -74, 40, 42], [-14, -31, 40, 32]]]],
      ["idle-turn-2", [[[414, 6, 58, 97], [30, 94]], PushBox.IDLE, [[-16, -96, 28, 18], [-14, -74, 40, 42], [-14, -31, 40, 32]]]],
      ["idle-turn-3", [[[486, 10, 54, 94], [27, 90]], PushBox.IDLE, [[-16, -96, 28, 18], [-14, -74, 40, 42], [-14, -31, 40, 32]]]],
      // Crouch Turn
      ["crouch-turn-1", [[[751, 46, 53, 61], [26, 58]], PushBox.CROUCH, [[-7, -60, 24, 18], [-28, -46, 44, 24], [-28, -24, 44, 24]]]],
      ["crouch-turn-2", [[[816, 46, 52, 61], [27, 58]], PushBox.CROUCH, [[-7, -60, 24, 18], [-28, -46, 44, 24], [-28, -24, 44, 24]]]],
      ["crouch-turn-3", [[[878, 46, 53, 61], [29, 58]], PushBox.CROUCH, [[-26, -61, 24, 18], [-28, -46, 44, 24], [-28, -24, 44, 24]]]],
      // Light Punch
      ["light-punch-1", [[[9, 365, 64, 91], [32, 88]], PushBox.IDLE, HurtBox.IDLE]],
      ["light-punch-2", [[[98, 365, 92, 91], [32, 88]], PushBox.IDLE, HurtBox.IDLE, [11, -85, 50, 18]]],
      // Medium/Heavy Punch
      ["med-punch-1", [[[6, 465, 60, 94], [29, 92]], PushBox.IDLE, HurtBox.IDLE]],
      ["med-punch-2", [[[86, 465, 74, 95], [29, 92]], PushBox.IDLE, HurtBox.PUNCH]],
      ["med-punch-3", [[[175, 465, 108, 94], [24, 92]], PushBox.IDLE, HurtBox.PUNCH, [17, -85, 68, 14]]],
      // Heavy Punch
      ["heavy-punch-1", [[[175, 465, 108, 94], [24, 92]], PushBox.IDLE, HurtBox.PUNCH, [17, -85, 76, 14]]],
      // Light/Medium Kick
      ["light-kick-1", [[[87, 923, 66, 92], [46, 93]], PushBox.IDLE, [[-33, -96, 30, 18], [-41, -79, 42, 32], [-32, -52, 44, 50]]]],
      ["light-kick-2", [[[162, 922, 114, 94], [68, 95]], PushBox.IDLE, [[-65, -96, 30, 18], [-57, -79, 42, 38], [-32, -52, 44, 50]], [-17, -98, 66, 28]]],
      // Medium Kick
      ["med-kick-1", [[[162, 922, 114, 94], [68, 95]], PushBox.IDLE, [[-65, -96, 30, 18], [-57, -79, 42, 38], [-32, -52, 44, 50]], [-18, -98, 80, 28]]],
      // Heavy Kick
      ["heavy-kick-1", [[[5, 1196, 61, 90], [37, 87]], PushBox.IDLE, [[-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]]]],
      ["heavy-kick-2", [[[72, 1192, 94, 94], [44, 91]], PushBox.IDLE, [[12, -90, 34, 34], [-25, -78, 42, 42], [-11, -50, 42, 50]], [15, -99, 40, 32]]],
      ["heavy-kick-3", [[[176, 1191, 120, 94], [42, 91]], PushBox.IDLE, [[13, -91, 62, 34], [-25, -78, 42, 42], [-11, -50, 42, 50]], [21, -97, 62, 24]]],
      ["heavy-kick-4", [[[306, 1208, 101, 77], [39, 74]], PushBox.IDLE, [[-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]]]],
      ["heavy-kick-5", [[[418, 1204, 64, 81], [38, 78]], PushBox.IDLE, [[-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]]]],
      // Hit Face
      ["hit-face-1", [[[169, 2152, 62, 90], [41, 87]], PushBox.IDLE, [[-25, -89, 20, 20], [-33, -74, 40, 46], [-30, -37, 40, 38]]]],
      ["hit-face-2", [[[238, 2153, 68, 89], [47, 86]], PushBox.IDLE, [[-42, -88, 20, 20], [-46, -74, 40, 46], [-33, -37, 40, 38]]]],
      ["hit-face-3", [[[314, 2153, 72, 88], [53, 85]], PushBox.IDLE, [[-52, -87, 20, 20], [-53, -71, 40, 46], [-33, -37, 40, 38]]]],
      ["hit-face-4", [[[397, 2157, 58, 85], [56, 80]], PushBox.IDLE, [[-57, -88, 20, 20], [-53, -71, 40, 46], [-33, -37, 40, 38]]]],
      // Hit Stomach
      ["hit-stomach-1", [[[397, 2029, 58, 85], [37, 83]], PushBox.IDLE, [[-15, -85, 28, 18], [-31, -69, 42, 42], [-30, -34, 42, 34]]]],
      ["hit-stomach-2", [[[470, 2032, 66, 82], [41, 80]], PushBox.IDLE, [[-17, 82, 28, 18], [-33, -65, 38, 36], [-34, -34, 42, 34]]]],
      ["hit-stomach-3", [[[544, 2034, 68, 84], [40, 81]], PushBox.IDLE, [[-17, 82, 28, 18], [-41, -59, 38, 30], [-34, -34, 42, 34]]]],
      ["hit-stomach-4", [[[936, 2280, 75, 72], [50, 69]], PushBox.IDLE, [[-28, -67, 28, 18], [-41, -59, 38, 30], [-40, -34, 42, 34]]]],
      // Stunned
      ["stun-1", [[[7, 2047, 77, 87], [23, 85]], PushBox.IDLE, [[-22, -91, 28, 18], [-30, -72, 42, 40], [-26, -31, 40, 32]]]],
      ["stun-2", [[[93, 2045, 65, 89], [28, 87]], PushBox.IDLE, [[-9, -89, 28, 18], [-23, -75, 40, 46], [-26, -31, 40, 32]]]],
      ["stun-3", [[[170, 2044, 67, 90], [28, 85]], PushBox.IDLE, [[8, -87, 28, 18], [-16, -75, 40, 46], [-26, -31, 40, 32]]]],
      // Hadouken
      ["special-1", [[[16, 1790, 74, 90], [28, 89]], PushBox.IDLE, HurtBox.IDLE]],
      ["special-2", [[[111, 1796, 85, 84], [25, 83]], PushBox.IDLE, HurtBox.IDLE]],
      ["special-3", [[[209, 1798, 90, 83], [25, 82]], PushBox.IDLE, HurtBox.PUNCH]],
      ["special-4", [[[314, 1804, 106, 77], [23, 76]], PushBox.IDLE, [[38, -79, 26, 18], [21, -65, 40, 38], [-12, -30, 78, 30]]]],
      // Winner Pose
      ["winner-pose-1", [[[365, 1934, 53, 83], [28, 80]], PushBox.IDLE, HurtBox.IDLE]],
      ["winner-pose-2", [[[431, 1929, 60, 88], [30, 85]], PushBox.IDLE, HurtBox.IDLE]],
      ["winner-pose-3", [[[503, 1920, 60, 97], [32, 94]], PushBox.IDLE, HurtBox.IDLE]],
      ["winner-pose-4", [[[637, 1903, 57, 113], [27, 111]], PushBox.IDLE, HurtBox.IDLE]]
    ]);
    animations = {
      [FighterState.IDLE]: [
        ["idle-1", 4],
        ["idle-2", 4],
        ["idle-3", 4],
        ["idle-4", 4],
        ["idle-3", 4],
        ["idle-2", 4]
      ],
      [FighterState.WALK_FORWARD]: [
        ["forwards-1", 3],
        ["forwards-2", 6],
        ["forwards-3", 4],
        ["forwards-4", 4],
        ["forwards-5", 4],
        ["forwards-6", 6]
      ],
      [FighterState.WALK_BACKWARD]: [
        ["backwards-1", 3],
        ["backwards-2", 6],
        ["backwards-3", 4],
        ["backwards-4", 4],
        ["backwards-5", 4],
        ["backwards-6", 6]
      ],
      [FighterState.JUMP_START]: [
        ["jump-land", 3],
        ["jump-land", FrameDelay.TRANSITION]
      ],
      [FighterState.JUMP_UP]: [
        ["jump-up-1", 8],
        ["jump-up-2", 8],
        ["jump-up-3", 8],
        ["jump-up-4", 8],
        ["jump-up-5", 8],
        ["jump-up-6", FrameDelay.TRANSITION]
      ],
      [FighterState.JUMP_FORWARD]: [
        ["jump-roll-1", 13],
        ["jump-roll-2", 5],
        ["jump-roll-3", 3],
        ["jump-roll-4", 3],
        ["jump-roll-5", 3],
        ["jump-roll-6", 5],
        ["jump-roll-6", FrameDelay.FREEZE]
      ],
      [FighterState.JUMP_BACKWARD]: [
        ["jump-roll-6", 15],
        ["jump-roll-5", 3],
        ["jump-roll-4", 3],
        ["jump-roll-3", 3],
        ["jump-roll-2", 3],
        ["jump-roll-1", FrameDelay.FREEZE]
      ],
      [FighterState.JUMP_LAND]: [
        ["jump-land", 2],
        ["jump-land", 5],
        ["jump-land", FrameDelay.TRANSITION]
      ],
      [FighterState.CROUCH]: [["crouch-3", FrameDelay.FREEZE]],
      [FighterState.CROUCH_DOWN]: [
        ["crouch-1", 2],
        ["crouch-2", 2],
        ["crouch-3", 2],
        ["crouch-3", FrameDelay.TRANSITION]
      ],
      [FighterState.CROUCH_UP]: [
        ["crouch-3", 2],
        ["crouch-2", 2],
        ["crouch-1", 2],
        ["crouch-1", FrameDelay.TRANSITION]
      ],
      [FighterState.IDLE_TURN]: [
        ["idle-turn-3", 2],
        ["idle-turn-2", 2],
        ["idle-turn-1", 2],
        ["idle-turn-1", FrameDelay.TRANSITION]
      ],
      [FighterState.CROUCH_TURN]: [
        ["crouch-turn-3", 2],
        ["crouch-turn-2", 2],
        ["crouch-turn-1", 2],
        ["crouch-turn-1", FrameDelay.TRANSITION]
      ],
      [FighterState.LIGHT_PUNCH]: [
        ["light-punch-1", 2],
        ["light-punch-2", 4],
        ["light-punch-1", 4],
        ["light-punch-1", FrameDelay.TRANSITION]
      ],
      [FighterState.MEDIUM_PUNCH]: [
        ["med-punch-1", 1],
        ["med-punch-2", 2],
        ["med-punch-3", 4],
        ["med-punch-2", 3],
        ["med-punch-1", 3],
        ["med-punch-1", FrameDelay.TRANSITION]
      ],
      [FighterState.HEAVY_PUNCH]: [
        ["med-punch-1", 3],
        ["med-punch-2", 2],
        ["heavy-punch-1", 6],
        ["med-punch-2", 6],
        ["med-punch-1", 12],
        ["med-punch-1", FrameDelay.TRANSITION]
      ],
      [FighterState.LIGHT_KICK]: [
        ["med-punch-1", 3],
        ["light-kick-1", 3],
        ["light-kick-2", 8],
        ["light-kick-1", 4],
        ["med-punch-1", 1],
        ["med-punch-1", FrameDelay.TRANSITION]
      ],
      [FighterState.MEDIUM_KICK]: [
        ["med-punch-1", 5],
        ["light-kick-1", 6],
        ["med-kick-1", 12],
        ["light-kick-1", 7],
        ["light-kick-1", FrameDelay.TRANSITION]
      ],
      [FighterState.HEAVY_KICK]: [
        ["heavy-kick-1", 2],
        ["heavy-kick-2", 4],
        ["heavy-kick-3", 8],
        ["heavy-kick-4", 10],
        ["heavy-kick-5", 7],
        ["heavy-kick-5", FrameDelay.TRANSITION]
      ],
      [FighterState.HURT_HEAD_LIGHT]: [
        ["hit-face-1", FIGHTER_HURT_DELAY],
        ["hit-face-1", 3],
        ["hit-face-2", 8],
        ["hit-face-2", FrameDelay.TRANSITION]
      ],
      [FighterState.HURT_HEAD_MEDIUM]: [
        ["hit-face-1", FIGHTER_HURT_DELAY],
        ["hit-face-1", 3],
        ["hit-face-2", 4],
        ["hit-face-3", 9],
        ["hit-face-3", FrameDelay.TRANSITION]
      ],
      [FighterState.HURT_HEAD_HEAVY]: [
        ["hit-face-3", FIGHTER_HURT_DELAY],
        ["hit-face-3", 7],
        ["hit-face-4", 4],
        ["stun-3", 9],
        ["stun-3", FrameDelay.TRANSITION]
      ],
      [FighterState.HURT_BODY_LIGHT]: [
        ["hit-stomach-1", FIGHTER_HURT_DELAY],
        ["hit-stomach-1", 11],
        ["hit-stomach-1", FrameDelay.TRANSITION]
      ],
      [FighterState.HURT_BODY_MEDIUM]: [
        ["hit-stomach-1", FIGHTER_HURT_DELAY],
        ["hit-stomach-1", 11],
        ["hit-stomach-1", FrameDelay.TRANSITION]
      ],
      [FighterState.HURT_BODY_HEAVY]: [
        ["hit-stomach-2", FIGHTER_HURT_DELAY],
        ["hit-stomach-2", 3],
        ["hit-stomach-3", 4],
        ["hit-stomach-4", 4],
        ["stun-3", 9],
        ["stun-3", FrameDelay.TRANSITION]
      ],
      [FighterState.SPECIAL_1]: [
        ["special-1", 2],
        ["special-2", 8],
        ["special-3", 2],
        ["special-4", 40],
        ["special-4", FrameDelay.TRANSITION]
      ],
      [FighterState.WINNER_POSE]: [
        ["winner-pose-1", 12],
        ["winner-pose-2", 15],
        ["winner-pose-3", 15],
        ["winner-pose-4", FrameDelay.TRANSITION]
      ]
    };
    initialVelocity = {
      x: {
        [FighterState.WALK_FORWARD]: 3 * 60,
        [FighterState.WALK_BACKWARD]: -(2 * 60),
        [FighterState.JUMP_FORWARD]: 48 * 3 + 12 * 2,
        [FighterState.JUMP_BACKWARD]: -(45 * 4 + 15 * 3)
      },
      jump: -420
    };
    specialMoves = [
      {
        state: FighterState.SPECIAL_1,
        sequence: [
          SpecialMoveDirection.DOWN,
          SpecialMoveDirection.FORWARD_DOWN,
          SpecialMoveDirection.FORWARD,
          SpecialMoveButton.ANY_PUNCH
        ],
        cursor: 0
      }
    ];
    gravity = 1e3;
    fireball = { fired: false, strength: void 0 };
    constructor(playerId, onAttackHit, entityList) {
      super({ playerId, onAttackHit });
      this.entityList = entityList;
      this.states[FighterState.SPECIAL_1] = {
        init: this.handleHadoukenInit.bind(this),
        update: this.handleHadoukenState.bind(this),
        shadow: [1.6, 1, 22, 0],
        validFrom: [
          FighterState.IDLE,
          FighterState.WALK_FORWARD,
          FighterState.IDLE_TURN,
          FighterState.CROUCH,
          FighterState.CROUCH_DOWN,
          FighterState.CROUCH_UP,
          FighterState.CROUCH_TURN,
          FighterState.LIGHT_PUNCH,
          FighterState.MEDIUM_PUNCH,
          FighterState.HEAVY_PUNCH
        ]
      };
      this.states[FighterState.IDLE].validFrom.push(FighterState.SPECIAL_1);
    }
    handleHadoukenInit(_, strength) {
      this.resetVelocities();
      playSound(this.voiceHadouken, 0.09);
      this.fireball = { fired: false, strength };
    }
    handleHadoukenState(time) {
      if (!this.fireball.fired && this.animationFrame === 3) {
        this.fireball.fired = true;
        this.entityList.add.call(
          this.entityList,
          Fireball,
          time,
          this,
          this.fireball.strength
        );
      }
      if (!this.isAnimationCompleted()) return;
      this.changeState(FighterState.IDLE, time);
    }
  };

  // src/entities/fighters/shared/HitSplash.js
  var HitSplash = class {
    constructor(args, time, entityList) {
      const [x, y, playerId] = args;
      this.image = document.querySelector('img[alt="decals"]');
      this.position = { x, y };
      this.playerId = playerId;
      this.entityList = entityList;
      this.frames = [];
      this.animationFrame = -1;
      this.animationTimer = 0;
    }
    update(time) {
      if (time.previous < this.animationTimer + 4 * FRAME_TIME) return;
      this.animationFrame++;
      this.animationTimer = time.previous;
      if (this.animationFrame >= 4) this.entityList.remove.call(this.entityList, this);
    }
    draw(context, camera) {
      const [[x, y, width, height], [originX, originY]] = this.frames[this.animationFrame + this.playerId * 4];
      context.drawImage(
        this.image,
        x,
        y,
        width,
        height,
        Math.floor(this.position.x / 2 - camera.position.x - originX),
        Math.floor(this.position.y / 2 - camera.position.y - originY),
        width,
        height
      );
    }
  };

  // src/entities/fighters/shared/LightHitSplash.js
  var LightHitSplash = class extends HitSplash {
    // prettier-ignore
    frames = [
      // Player 1
      [[14, 16, 9, 10], [6, 7]],
      [[34, 15, 13, 11], [7, 7]],
      [[55, 15, 13, 11], [7, 7]],
      [[75, 10, 20, 19], [11, 11]],
      // Player 2
      [[160, 16, 9, 10], [6, 7]],
      [[178, 15, 13, 11], [7, 7]],
      [[199, 15, 13, 11], [7, 7]],
      [[219, 10, 20, 19], [11, 11]]
    ];
    constructor(args, time, entityList) {
      super(args, time, entityList);
    }
  };

  // src/entities/fighters/shared/MediumHitSplash.js
  var MediumHitSplash = class extends HitSplash {
    // prettier-ignore
    frames = [
      // Player 1
      [[13, 41, 14, 15], [7, 7]],
      [[34, 39, 21, 19], [10, 9]],
      [[64, 39, 21, 19], [10, 9]],
      [[90, 35, 27, 25], [13, 12]],
      // Player 2
      [[159, 41, 14, 15], [7, 7]],
      [[182, 39, 21, 19], [10, 9]],
      [[211, 39, 21, 19], [10, 9]],
      [[239, 35, 27, 25], [13, 12]]
    ];
    constructor(args, time, entityList) {
      super(args, time, entityList);
    }
  };

  // src/entities/fighters/shared/HeavyHitSplash.js
  var HeavyHitSplash = class extends HitSplash {
    // prettier-ignore
    frames = [
      // Player 1
      [[14, 68, 15, 21], [7, 10]],
      [[38, 70, 27, 23], [13, 11]],
      [[73, 70, 27, 23], [13, 11]],
      [[186, 66, 32, 31], [16, 15]],
      // Player 2
      [[160, 68, 15, 21], [7, 10]],
      [[185, 70, 27, 23], [13, 11]],
      [[222, 70, 27, 23], [13, 11]],
      [[255, 66, 32, 31], [16, 15]]
    ];
    constructor(args, time, entityList) {
      super(args, time, entityList);
    }
  };

  // src/entities/fighters/shared/Shadow.js
  var Shadow = class {
    constructor(fighter) {
      this.image = document.querySelector('img[alt="shadow"]');
      this.fighter = fighter;
      this.frame = [
        [0, 0, 68, 11],
        [34, 7]
      ];
    }
    getScale() {
      if (this.fighter.position.y !== STAGE_FLOOR) {
        const airScale = 1 - (STAGE_FLOOR - this.fighter.position.y) / 250;
        return [airScale, airScale];
      } else if (this.fighter.states[this.fighter.currentState].shadow) {
        const [scaleX, scaleY, offsetX, offsetY] = this.fighter.states[this.fighter.currentState].shadow;
        return [scaleX, scaleY, offsetX * -this.fighter.direction, offsetY];
      }
      return [1, 1];
    }
    update() {
    }
    draw(context, camera) {
      const [[x, y, width, height], [originX, originY]] = this.frame;
      const [scaleX = 1, scaleY = 1, offsetX = 0, offsetY = 0] = this.getScale();
      context.globalAlpha = 0.5;
      context.drawImage(
        this.image,
        x,
        y,
        width,
        height,
        Math.floor(
          this.fighter.position.x - camera.position.x - originX * scaleX
        ) - offsetX,
        Math.floor(STAGE_FLOOR - camera.position.y - originY * scaleY) - offsetY,
        Math.floor(width * scaleX),
        Math.floor(height * scaleY)
      );
      context.globalAlpha = 1;
    }
  };

  // src/entities/overlays/FpsCounter.js
  var FpsCounter = class {
    constructor() {
      this.fps = 0;
    }
    update(time) {
      this.fps = Math.trunc(1 / time.secondsPassed);
    }
    draw(context) {
      context.font = "14px Arial";
      context.fillStyle = "#00FF00";
      context.textAlign = "right";
      context.fillText(`${this.fps}`, SCREEN_WIDTH - 2, SCREEN_HEIGHT - 2);
    }
  };

  // src/utils/context.js
  function getContext() {
    const canvasElement = document.querySelector("canvas");
    const context = canvasElement.getContext("2d");
    context.imageSmoothingEnabled = false;
    context.canvas.width = SCREEN_WIDTH;
    context.canvas.height = SCREEN_HEIGHT;
    return context;
  }
  function drawFrame(context, image, dimensions, x, y, direction = 1) {
    const [sourceX, sourceY, sourceWidth, sourceHeight] = dimensions;
    context.scale(direction, 1);
    context.drawImage(
      image,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      x * direction,
      y,
      sourceWidth,
      sourceHeight
    );
    context.setTransform(1, 0, 0, 1, 0, 0);
  }

  // src/entities/overlays/StatusBar.js
  var StatusBar = class {
    time = 99;
    timeTimer = 0;
    timeFlashTimer = 0;
    useFlashFrames = false;
    healthBars = [
      {
        timer: 0,
        hitPoints: HEALTH_MAX_HIT_POINTS
      },
      {
        timer: 0,
        hitPoints: HEALTH_MAX_HIT_POINTS
      }
    ];
    koFrame = 0;
    koAnimationTimer = 0;
    frames = /* @__PURE__ */ new Map([
      ["health-bar", [16, 18, 145, 11]],
      ["ko-white", [161, 16, 32, 14]],
      ["ko-red", [161, 1, 32, 14]],
      [`${TIME_FRAME_KEYS[0]}-0`, [16, 32, 14, 16]],
      [`${TIME_FRAME_KEYS[0]}-1`, [32, 32, 14, 16]],
      [`${TIME_FRAME_KEYS[0]}-2`, [48, 32, 14, 16]],
      [`${TIME_FRAME_KEYS[0]}-3`, [64, 32, 14, 16]],
      [`${TIME_FRAME_KEYS[0]}-4`, [80, 32, 14, 16]],
      [`${TIME_FRAME_KEYS[0]}-5`, [96, 32, 14, 16]],
      [`${TIME_FRAME_KEYS[0]}-6`, [112, 32, 14, 16]],
      [`${TIME_FRAME_KEYS[0]}-7`, [128, 32, 14, 16]],
      [`${TIME_FRAME_KEYS[0]}-8`, [144, 32, 14, 16]],
      [`${TIME_FRAME_KEYS[0]}-9`, [160, 32, 14, 16]],
      [`${TIME_FRAME_KEYS[1]}-0`, [16, 192, 14, 16]],
      [`${TIME_FRAME_KEYS[1]}-1`, [32, 192, 14, 16]],
      [`${TIME_FRAME_KEYS[1]}-2`, [48, 192, 14, 16]],
      [`${TIME_FRAME_KEYS[1]}-3`, [64, 192, 14, 16]],
      [`${TIME_FRAME_KEYS[1]}-4`, [80, 192, 14, 16]],
      [`${TIME_FRAME_KEYS[1]}-5`, [96, 192, 14, 16]],
      [`${TIME_FRAME_KEYS[1]}-6`, [112, 192, 14, 16]],
      [`${TIME_FRAME_KEYS[1]}-7`, [128, 192, 14, 16]],
      [`${TIME_FRAME_KEYS[1]}-8`, [144, 192, 14, 16]],
      [`${TIME_FRAME_KEYS[1]}-9`, [160, 192, 14, 16]],
      // Numeric
      ["score-0", [17, 101, 10, 10]],
      ["score-1", [29, 101, 10, 10]],
      ["score-2", [41, 101, 10, 10]],
      ["score-3", [53, 101, 10, 10]],
      ["score-4", [65, 101, 11, 10]],
      ["score-5", [77, 101, 10, 10]],
      ["score-6", [89, 101, 10, 10]],
      ["score-7", [101, 101, 10, 10]],
      ["score-8", [113, 101, 10, 10]],
      ["score-9", [125, 101, 10, 10]],
      // Alpha
      ["score-@", [17, 113, 10, 10]],
      ["score-A", [29, 113, 11, 10]],
      ["score-B", [41, 113, 10, 10]],
      ["score-C", [53, 113, 10, 10]],
      ["score-D", [65, 113, 10, 10]],
      ["score-E", [77, 113, 10, 10]],
      ["score-F", [89, 113, 10, 10]],
      ["score-G", [101, 113, 10, 10]],
      ["score-H", [113, 113, 10, 10]],
      ["score-I", [125, 113, 9, 10]],
      ["score-J", [136, 113, 10, 10]],
      ["score-K", [149, 113, 10, 10]],
      ["score-L", [161, 113, 10, 10]],
      ["score-M", [173, 113, 10, 10]],
      ["score-N", [185, 113, 11, 10]],
      ["score-O", [197, 113, 10, 10]],
      ["score-P", [17, 125, 10, 10]],
      ["score-Q", [29, 125, 10, 10]],
      ["score-R", [41, 125, 10, 10]],
      ["score-S", [53, 125, 10, 10]],
      ["score-T", [65, 125, 10, 10]],
      ["score-U", [77, 125, 10, 10]],
      ["score-V", [89, 125, 10, 10]],
      ["score-W", [101, 125, 10, 10]],
      ["score-X", [113, 125, 10, 10]],
      ["score-Y", [125, 125, 10, 10]],
      ["score-Z", [136, 125, 10, 10]],
      // Name tags
      ["tag-ken", [128, 56, 30, 9]],
      ["tag-ryu", [16, 56, 28, 9]]
    ]);
    constructor() {
      this.image = document.querySelector('img[alt="misc"]');
      this.names = gameState.fighters.map(
        ({ id }) => `tag-${id.toLowerCase()}`
      );
    }
    updateTime(time) {
      if (time.previous > this.timeTimer + TIME_DELAY) {
        this.time -= 1;
        this.timeTimer = time.previous;
      }
      if (this.time < 15 && this.time > -1 && time.previous > this.timeFlashTimer + TIME_FLASH_DELAY) {
        this.useFlashFrames = !this.useFlashFrames;
        this.timeFlashTimer = time.previous;
      }
    }
    updateHealthBars(time) {
      for (const index in this.healthBars) {
        if (this.healthBars[index].hitPoints <= gameState.fighters[index].hitPoints)
          continue;
        this.healthBars[index].hitPoints = Math.max(
          0,
          this.healthBars[index].hitPoints - time.secondsPassed * FPS
        );
      }
    }
    updateKoIcon(time) {
      if (this.healthBars.every(
        (healthBar) => healthBar.hitPoints > HEALTH_CRITICAL_HIT_POINTS
      ))
        return;
      if (time.previous < this.koAnimationTimer + KO_FLASH_DELAY[this.koFrame])
        return;
      this.koFrame = 1 - this.koFrame;
      this.koAnimationTimer = time.previous;
    }
    update(time) {
      this.updateTime(time);
      this.updateHealthBars(time);
      this.updateKoIcon(time);
    }
    drawFrame(context, frameKey, x, y, direction = 1) {
      drawFrame(
        context,
        this.image,
        this.frames.get(frameKey),
        x,
        y,
        direction
      );
    }
    drawHealthBars(context) {
      this.drawFrame(context, "health-bar", 31, 20);
      this.drawFrame(
        context,
        KO_ANIMATION[this.koFrame],
        176,
        18 - this.koFrame
      );
      this.drawFrame(context, "health-bar", 353, 20, -1);
      context.fillStyle = HEALTH_DAMAGE_COLOR;
      context.beginPath();
      context.fillRect(
        32,
        21,
        HEALTH_MAX_HIT_POINTS - Math.floor(this.healthBars[0].hitPoints),
        9
      );
      context.fillRect(
        208 + Math.floor(this.healthBars[1].hitPoints),
        21,
        HEALTH_MAX_HIT_POINTS - Math.floor(this.healthBars[1].hitPoints),
        9
      );
    }
    drawNameTags(context) {
      const [name1, name2] = this.names;
      const tag1 = this.frames.has(name1) ? name1 : "tag-ryu";
      const tag2 = this.frames.has(name2) ? name2 : "tag-ken";
      this.drawFrame(context, tag1, 32, 33);
      this.drawFrame(context, tag2, 322, 33);
    }
    drawTime(context) {
      const timeString = String(Math.max(this.time, 0)).padStart(2, "00");
      const flashFrame = TIME_FRAME_KEYS[Number(this.useFlashFrames)];
      this.drawFrame(
        context,
        `${flashFrame}-${timeString.charAt(0)}`,
        178,
        33
      );
      this.drawFrame(
        context,
        `${flashFrame}-${timeString.charAt(1)}`,
        194,
        33
      );
    }
    drawScoreLabel(context, label, x) {
      for (const index in label) {
        this.drawFrame(
          context,
          `score-${label.charAt(index)}`,
          x + index * 12,
          1
        );
      }
    }
    drawScore(context, score, x) {
      const strScore = String(score);
      const padding = 6 * 12 - strScore.length * 12;
      this.drawScoreLabel(context, strScore, x + padding);
    }
    drawScores(context) {
      this.drawScoreLabel(context, "P1", 17);
      this.drawScore(context, gameState.fighters[0].score, 45);
      this.drawScoreLabel(context, "IURI", 133);
      this.drawScore(context, 5e4, 177);
      this.drawScoreLabel(context, "P2", 269);
      this.drawScore(context, gameState.fighters[1].score, 309);
    }
    draw(context) {
      this.drawScores(context);
      this.drawHealthBars(context);
      this.drawNameTags(context);
      this.drawTime(context);
    }
    reset() {
      this.time = 99;
      this.timeTimer = 0;
      this.healthBars[0].hitPoints = HEALTH_MAX_HIT_POINTS;
      this.healthBars[1].hitPoints = HEALTH_MAX_HIT_POINTS;
      this.names = gameState.fighters.map(
        ({ id }) => `tag-${id.toLowerCase()}`
      );
    }
  };

  // src/entities/stage/shared/BackgroundAnimation.js
  var BackgroundAnimation = class {
    constructor(image, frames2, animation, startFrame = 0) {
      this.image = image;
      this.frames = new Map(frames2);
      this.animation = animation;
      this.animationTimer = 0;
      this.animationFrame = startFrame;
      this.frameDelay = animation[this.animationFrame][1];
    }
    update(time) {
      if (time.previous > this.animationTimer + this.frameDelay) {
        this.animationFrame += 1;
        if (this.animationFrame >= this.animation.length) {
          this.animationFrame = 0;
        }
        this.frameDelay = this.animation[this.animationFrame][1];
        this.animationTimer = time.previous;
      }
    }
    draw(context, x, y) {
      const [frameKey] = this.animation[this.animationFrame];
      const [frameX, frameY, frameWidth, frameHeight] = this.frames.get(frameKey);
      context.drawImage(
        this.image,
        frameX,
        frameY,
        frameWidth,
        frameHeight,
        x,
        y,
        frameWidth,
        frameHeight
      );
    }
  };

  // src/entities/stage/shared/SkewedFloor.js
  var SkewedFloor = class {
    constructor(image, dimensions) {
      this.image = image;
      this.dimensions = dimensions;
    }
    update(time) {
    }
    draw(context, camera, y) {
      const [sourceX, sourceY, sourceWidth, sourceHeight] = this.dimensions;
      context.save();
      context.setTransform(
        1,
        0,
        -5.15 - (camera.position.x - (STAGE_WIDTH + STAGE_PADDING)) / 112,
        1,
        32 - camera.position.x / 1.55,
        y - camera.position.y
      );
      context.drawImage(
        this.image,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        sourceWidth,
        sourceHeight
      );
      context.restore();
    }
  };

  // src/entities/stage/KenStage.js
  var KenStage = class {
    image = document.querySelector('img[alt="stage"]');
    music = document.querySelector("audio#theme-ken");
    floor = new SkewedFloor(this.image, [8, 392, 896, 56]);
    frames = /* @__PURE__ */ new Map([
      ["stage-background", [72, 208, 768, 176]],
      ["stage-boat", [8, 16, 521, 180]],
      ["stage-floor-bottom", [8, 448, 896, 16]],
      // Grey Suit Man
      ["grey-suit-1", [600, 24, 16, 24]],
      ["grey-suit-2", [600, 88, 16, 24]],
      // Bollards
      ["bollard-small", [800, 184, 21, 16]],
      ["bollard-large", [760, 176, 31, 24]],
      ["barrels", [560, 472, 151, 96]]
    ]);
    flag = new BackgroundAnimation(
      this.image,
      [
        ["flag-1", [848, 312, 40, 32]],
        ["flag-2", [848, 264, 40, 32]],
        ["flag-3", [848, 216, 40, 32]]
      ],
      [
        ["flag-1", 133],
        ["flag-2", 133],
        ["flag-3", 133]
      ]
    );
    baldMan = new BackgroundAnimation(
      this.image,
      [
        ["bald-man-1", [552, 8, 40, 64]],
        ["bald-man-2", [552, 72, 40, 64]],
        ["bald-man-3", [552, 136, 40, 64]]
      ],
      [
        ["bald-man-1", 100],
        ["bald-man-2", 133],
        ["bald-man-3", 664],
        ["bald-man-2", 133]
      ]
    );
    cheeringWoman = new BackgroundAnimation(
      this.image,
      [
        ["woman-1", [624, 16, 32, 56]],
        ["woman-2", [624, 80, 32, 56]],
        ["woman-3", [624, 144, 32, 56]]
      ],
      [
        ["woman-1", 216],
        ["woman-2", 216],
        ["woman-3", 216],
        ["woman-2", 216]
      ]
    );
    greenJumperGuy = new BackgroundAnimation(
      this.image,
      [
        ["green-jumper-1", [664, 16, 32, 56]],
        ["green-jumper-2", [664, 80, 32, 56]]
      ],
      [
        ["green-jumper-1", 664],
        ["green-jumper-2", 498],
        ["green-jumper-1", 133],
        ["green-jumper-2", 133]
      ]
    );
    blueCoatGuy = new BackgroundAnimation(
      this.image,
      [
        ["blue-coat-1", [704, 16, 48, 56]],
        ["blue-coat-2", [704, 80, 48, 56]],
        ["blue-coat-3", [704, 144, 48, 56]]
      ],
      [
        ["blue-coat-1", 996],
        ["blue-coat-2", 133],
        ["blue-coat-3", 100],
        ["blue-coat-2", 133],
        ["blue-coat-1", 249],
        ["blue-coat-2", 133],
        ["blue-coat-3", 100],
        ["blue-coat-2", 133]
      ]
    );
    purpleJumperGuy = new BackgroundAnimation(
      this.image,
      [
        ["purple-jumper-1", [808, 24, 48, 32]],
        ["purple-jumper-2", [808, 72, 48, 32]],
        ["purple-jumper-3", [808, 120, 48, 32]]
      ],
      [
        ["purple-jumper-1", 1992],
        ["purple-jumper-2", 166],
        ["purple-jumper-3", 166],
        ["purple-jumper-2", 166],
        ["purple-jumper-1", 664],
        ["purple-jumper-2", 166],
        ["purple-jumper-3", 166],
        ["purple-jumper-2", 166],
        ["purple-jumper-3", 166],
        ["purple-jumper-2", 166]
      ]
    );
    brownSuitGuy = new BackgroundAnimation(
      this.image,
      [
        ["brown-suit-1", [760, 16, 40, 40]],
        ["brown-suit-2", [760, 64, 40, 40]],
        ["brown-suit-3", [760, 112, 40, 40]]
      ],
      [
        ["brown-suit-1", 133],
        ["brown-suit-2", 133],
        ["brown-suit-3", 133],
        ["brown-suit-2", 133]
      ]
    );
    greySuitMan = {
      animationFrame: 0,
      animationTimer: 0,
      animationDelay: 0
    };
    boat = {
      position: { x: 0, y: 0 },
      animationFrame: 0,
      animationTimer: 0,
      animationDelay: 22,
      animation: [0, -1, -2, -3, -4, -3, -2, -1]
    };
    constructor() {
      playSound(this.music, 0.03);
    }
    updateBoat(time) {
      if (time.previous > this.boat.animationTimer + this.boat.animationDelay * FRAME_TIME) {
        this.boat.animationTimer = time.previous;
        this.boat.animationFrame += 1;
        this.boat.animationDelay = 22 + (Math.random() * 16 - 8);
      }
      if (this.boat.animationFrame >= this.boat.animation.length) {
        this.boat.animationFrame = 0;
      }
    }
    upgradeGreySuitMan(time) {
      if (time.previous > this.greySuitMan.animationTimer + this.greySuitMan.animationDelay) {
        this.greySuitMan.animationTimer = time.previous;
        this.greySuitMan.animationDelay = 100 + Math.random() * 900;
        this.greySuitMan.animationFrame = !this.greySuitMan.animationFrame;
      }
    }
    update(time) {
      this.flag.update(time);
      this.updateBoat(time);
      this.baldMan.update(time);
      this.upgradeGreySuitMan(time);
      this.cheeringWoman.update(time);
      this.greenJumperGuy.update(time);
      this.blueCoatGuy.update(time);
      this.purpleJumperGuy.update(time);
      this.brownSuitGuy.update(time);
    }
    drawFrame(context, frameKey, x, y) {
      drawFrame(context, this.image, this.frames.get(frameKey), x, y);
    }
    drawSkyOcean(context, camera) {
      const backgroundX = Math.floor(16 - camera.position.x / 2.157303);
      this.drawFrame(
        context,
        "stage-background",
        backgroundX,
        -camera.position.y
      );
      this.flag.draw(context, backgroundX + 560, 16 - camera.position.y);
    }
    drawBoat(context, camera) {
      this.boat.position = {
        x: Math.floor(150 - camera.position.x / 1.613445),
        y: Math.floor(
          -camera.position.y + this.boat.animation[this.boat.animationFrame]
        )
      };
      this.drawFrame(
        context,
        "stage-boat",
        this.boat.position.x,
        this.boat.position.y
      );
      this.baldMan.draw(
        context,
        this.boat.position.x + 128,
        this.boat.position.y + 96
      );
      this.drawFrame(
        context,
        `grey-suit-${this.greySuitMan.animationFrame + 1}`,
        this.boat.position.x + 167,
        this.boat.position.y + 112
      );
      this.cheeringWoman.draw(
        context,
        this.boat.position.x + 192,
        this.boat.position.y + 104
      );
      this.greenJumperGuy.draw(
        context,
        this.boat.position.x + 224,
        this.boat.position.y + 104
      );
      this.blueCoatGuy.draw(
        context,
        this.boat.position.x + 288,
        this.boat.position.y + 96
      );
      this.purpleJumperGuy.draw(
        context,
        this.boat.position.x + 128,
        this.boat.position.y + 24
      );
      this.brownSuitGuy.draw(
        context,
        this.boat.position.x + 88,
        this.boat.position.y + 24
      );
    }
    drawFloor(context, camera) {
      this.floor.draw(context, camera, 176);
      this.drawFrame(
        context,
        "stage-floor-bottom",
        STAGE_PADDING - camera.position.x * 1.1,
        232 - camera.position.y
      );
    }
    drawSmallBollards(context, camera) {
      const cameraXOffset = camera.position.x / 1.54;
      const y = 166 - camera.position.y;
      this.drawFrame(
        context,
        "bollard-small",
        Math.floor(468 - 92 - cameraXOffset),
        y
      );
      this.drawFrame(
        context,
        "bollard-small",
        Math.floor(468 + 92 - cameraXOffset),
        y
      );
    }
    drawLargeBollards(context, camera) {
      const midPoint = STAGE_MID_POINT + STAGE_PADDING;
      const cameraXOffset = camera.position.x / 0.958;
      const y = 200 - camera.position.y;
      this.drawFrame(
        context,
        "bollard-large",
        Math.floor(midPoint - 147 - cameraXOffset),
        y
      );
      this.drawFrame(
        context,
        "bollard-large",
        Math.floor(midPoint + 147 - cameraXOffset),
        y
      );
    }
    drawBackground(context, camera) {
      this.drawSkyOcean(context, camera);
      this.drawBoat(context, camera);
      this.drawFloor(context, camera);
      this.drawSmallBollards(context, camera);
      this.drawFrame(
        context,
        "barrels",
        Math.floor(872 - camera.position.x),
        120 - camera.position.y
      );
    }
    drawForeground(context, camera) {
      this.drawLargeBollards(context, camera);
    }
  };

  // src/scenes/BattleScene.js
  var BattleScene = class {
    fighters = [];
    shadows = [];
    camera = void 0;
    hurtTimer = void 0;
    fighterDrawOrder = [0, 1];
    roundEnded = false;
    roundEndTimer = 0;
    roundWinner = null;
    onRoundComplete = null;
    constructor() {
      this.stage = new KenStage();
      this.entities = new EntityList();
      this.overlays = [new StatusBar(this.fighters), new FpsCounter()];
      this.startRound();
    }
    getFighterEntityClass(id) {
      switch (id) {
        case FighterId.KEN:
        case "Ken":
        case "Vespera":
          return Ken;
        case FighterId.RYU:
        case "Ryu":
        case "Kaelen":
        case "Omega":
        default:
          return Ryu;
      }
    }
    getFighterEntity(fighterState, index) {
      const FighterEntityClass = this.getFighterEntityClass(fighterState.id);
      return new FighterEntityClass(
        index,
        this.handleAttackHit.bind(this),
        this.entities
      );
    }
    getFighterEntities() {
      const fighterEntities = gameState.fighters.map(
        this.getFighterEntity.bind(this)
      );
      fighterEntities[0].opponent = fighterEntities[1];
      fighterEntities[1].opponent = fighterEntities[0];
      return fighterEntities;
    }
    getHitSplashClass(strength) {
      switch (strength) {
        case FighterAttackStrength.LIGHT:
          return LightHitSplash;
        case FighterAttackStrength.MEDIUM:
          return MediumHitSplash;
        case FighterAttackStrength.HEAVY:
          return HeavyHitSplash;
        default:
          throw new Error("Unknown strength requested!");
      }
    }
    handleAttackHit(time, playerId, opponentId, position, strength) {
      gameState.fighters[playerId].score += FighterAttackBaseData[strength].score;
      gameState.fighters[opponentId].hitPoints -= FighterAttackBaseData[strength].damage;
      this.hurtTimer = time.previous + FIGHTER_HURT_DELAY * FRAME_TIME;
      this.fighterDrawOrder = [playerId, opponentId];
      if (!position) return;
      this.entities.add(
        this.getHitSplashClass(strength),
        time,
        position.x,
        position.y,
        playerId
      );
    }
    startRound() {
      this.fighters = this.getFighterEntities();
      this.camera = new Camera(
        STAGE_MID_POINT + STAGE_PADDING - SCREEN_WIDTH / 2,
        16,
        this.fighters
      );
      this.shadows = this.fighters.map((fighter) => new Shadow(fighter));
    }
    finishRound(winner, time) {
      if (!this.roundEnded) {
        this.roundEnded = true;
        this.roundEndTimer = time.previous + 1800;
        this.roundWinner = winner;
        winner.handleFinishRound(true, time);
        winner.opponent.handleFinishRound(false, time);
      }
    }
    updateFighters(time, context) {
      for (const fighter of this.fighters) {
        pollControl(time, fighter.playerId, fighter.direction);
        if (time.previous < this.hurtTimer) {
          fighter.updateHurtShake(time, this.hurtTimer);
        } else {
          fighter.update(time, context, this.camera);
        }
        if (gameState.fighters[fighter.playerId].hitPoints <= 0)
          this.finishRound(fighter.opponent, time);
        const statusBar = this.overlays.filter(
          (overlay) => Object.keys(overlay).includes("time")
        )[0];
        if (!statusBar.time <= 0) continue;
        if (gameState.fighters[fighter.playerId].hitPoints === gameState.fighters[fighter.opponent.playerId].hitPoints) {
          this.finishRound(fighter, time);
          this.finishRound(fighter.opponent, time);
        }
        if (gameState.fighters[fighter.playerId].hitPoints > gameState.fighters[fighter.opponent.playerId].hitPoints) {
          this.finishRound(fighter, time);
        }
      }
    }
    updateShadows(time, context) {
      for (const shadow of this.shadows) {
        shadow.update(time, context, this.camera);
      }
    }
    updateOverlays(time, context) {
      for (const overlay of this.overlays) {
        overlay.update(time, context, this.camera);
      }
    }
    update(time, context) {
      if (matchManager.isCpu && this.fighters.length >= 2) {
        cpuController.active = true;
        cpuController.update(time, this.fighters[0], this.fighters[1], matchManager.difficulty);
      } else {
        cpuController.active = false;
      }
      this.updateFighters(time, context);
      this.updateShadows(time, context);
      this.stage.update(time);
      this.entities.update(time, context, this.camera);
      this.camera.update(time, context);
      this.updateOverlays(time, context);
      if (this.roundEnded && time.previous > this.roundEndTimer) {
        if (this.onRoundComplete) {
          const winnerIdx = this.roundWinner ? this.roundWinner.playerId : 0;
          const statusBar = this.overlays.find((overlay) => "time" in overlay);
          const timeRemaining = statusBar ? statusBar.time : 0;
          const callback = this.onRoundComplete;
          this.onRoundComplete = null;
          callback(
            winnerIdx,
            gameState.fighters[0].hitPoints,
            gameState.fighters[1].hitPoints,
            timeRemaining
          );
        }
      }
    }
    resetRound() {
      this.roundEnded = false;
      this.roundWinner = null;
      this.roundEndTimer = 0;
      this.hurtTimer = void 0;
      gameState.resetFighterStates(
        matchManager.getPlayerFighter().id,
        matchManager.getOpponentFighter().id
      );
      this.startRound();
      const statusBar = this.overlays.find((overlay) => "time" in overlay);
      if (statusBar && typeof statusBar.reset === "function") {
        statusBar.reset();
      }
      const canvas = document.querySelector("canvas");
      if (canvas) {
        canvas.style.filter = matchManager.getCurrentStage().filter;
      }
    }
    drawFighters(context) {
      for (const fighterId of this.fighterDrawOrder) {
        this.fighters[fighterId].draw(context, this.camera);
      }
    }
    drawShadows(context) {
      for (const shadow of this.shadows) {
        shadow.draw(context, this.camera);
      }
    }
    drawOverlays(context) {
      for (const overlay of this.overlays) {
        overlay.draw(context, this.camera);
      }
    }
    draw(context) {
      this.stage.drawBackground(context, this.camera);
      this.drawShadows(context);
      this.drawFighters(context);
      this.entities.draw(context, this.camera);
      this.stage.drawForeground(context, this.camera);
      this.drawOverlays(context);
    }
  };

  // src/ui/UIManager.js
  var UIManager = class {
    container = null;
    game = null;
    menuIndex = 0;
    stageMenuIndex = 0;
    diffMenuIndex = 1;
    constructor(game) {
      this.game = game;
      this.initDOM();
      this.bindEvents();
      this.render();
    }
    initDOM() {
      let ui = document.getElementById("game-ui");
      if (!ui) {
        ui = document.createElement("div");
        ui.id = "game-ui";
        document.body.appendChild(ui);
      }
      this.container = ui;
    }
    bindEvents() {
      window.addEventListener("keydown", (e) => this.handleKeyDown(e));
    }
    handleKeyDown(e) {
      const screen = matchManager.currentScreen;
      if (screen === GameScreen.FIGHTING) {
        if (e.code === "Escape") {
          e.preventDefault();
          matchManager.setScreen(GameScreen.MAIN_MENU);
          this.render();
        }
        return;
      }
      if (["ArrowUp", "KeyW"].includes(e.code)) {
        e.preventDefault();
        this.navigateMenu(-1);
      } else if (["ArrowDown", "KeyS"].includes(e.code)) {
        e.preventDefault();
        this.navigateMenu(1);
      } else if (["ArrowLeft", "KeyA"].includes(e.code)) {
        e.preventDefault();
        this.navigateHorizontal(-1);
      } else if (["ArrowRight", "KeyD"].includes(e.code)) {
        e.preventDefault();
        this.navigateHorizontal(1);
      } else if (["Enter", "Space"].includes(e.code)) {
        e.preventDefault();
        this.selectCurrentOption();
      } else if (e.code === "Escape") {
        e.preventDefault();
        this.handleBack();
      }
    }
    navigateMenu(direction) {
      const items = this.container.querySelectorAll(".menu-item, .fighter-card, .stage-item, .diff-btn");
      if (!items.length) return;
      this.menuIndex = (this.menuIndex + direction + items.length) % items.length;
      this.updateSelectionHighlight(items);
    }
    navigateHorizontal(direction) {
      const screen = matchManager.currentScreen;
      if (screen === GameScreen.FIGHTER_SELECT) {
        this.navigateMenu(direction);
      } else if (screen === GameScreen.STAGE_SELECT) {
        const diffs = DIFFICULTIES;
        this.diffMenuIndex = (this.diffMenuIndex + direction + diffs.length) % diffs.length;
        matchManager.setDifficulty(diffs[this.diffMenuIndex]);
        this.render();
      }
    }
    updateSelectionHighlight(items) {
      items.forEach((item, idx) => {
        if (idx === this.menuIndex) {
          item.classList.add("selected");
          item.scrollIntoView({ block: "nearest", behavior: "smooth" });
        } else {
          item.classList.remove("selected");
        }
      });
    }
    selectCurrentOption() {
      const selected = this.container.querySelector(".menu-item.selected, .fighter-card.selected, .action-btn.selected, .stage-item.selected");
      if (selected && selected.dataset.action) {
        this.triggerAction(selected.dataset.action, selected.dataset.value);
      } else {
        const fallback = this.container.querySelector('[data-action="start-match"], [data-action="next-round"], [data-action="next-stage"], [data-action="retry-round"]');
        if (fallback) {
          this.triggerAction(fallback.dataset.action, fallback.dataset.value);
        }
      }
    }
    handleBack() {
      const screen = matchManager.currentScreen;
      if ([GameScreen.INSTRUCTIONS, GameScreen.SETTINGS, GameScreen.CREDITS, GameScreen.FIGHTER_SELECT].includes(screen)) {
        matchManager.setScreen(GameScreen.MAIN_MENU);
        this.menuIndex = 0;
        this.render();
      } else if (screen === GameScreen.STAGE_SELECT) {
        matchManager.setScreen(GameScreen.FIGHTER_SELECT);
        this.menuIndex = matchManager.selectedFighterIndex;
        this.render();
      }
    }
    triggerAction(action, value) {
      switch (action) {
        case "play-game":
          matchManager.setScreen(GameScreen.FIGHTER_SELECT);
          this.menuIndex = matchManager.selectedFighterIndex;
          this.render();
          break;
        case "select-fighter":
          const fIdx = parseInt(value, 10);
          matchManager.selectFighter(fIdx);
          matchManager.setScreen(GameScreen.STAGE_SELECT);
          this.menuIndex = matchManager.selectedStageIndex;
          this.render();
          break;
        case "select-stage":
          const sIdx = parseInt(value, 10);
          matchManager.selectStage(sIdx);
          this.render();
          break;
        case "set-difficulty":
          matchManager.setDifficulty(value);
          this.render();
          break;
        case "start-match":
          matchManager.startMatch();
          this.render();
          if (this.game) {
            this.game.startMatch();
          }
          break;
        case "next-round":
          matchManager.advanceRound();
          this.render();
          if (this.game) {
            this.game.nextRound();
          }
          break;
        case "next-stage":
          matchManager.advanceStage();
          if (matchManager.currentScreen === GameScreen.FINAL_VICTORY) {
            this.render();
          } else {
            this.render();
            if (this.game) {
              this.game.nextStage();
            }
          }
          break;
        case "retry-round":
          matchManager.retryRound();
          this.render();
          if (this.game) {
            this.game.nextRound();
          }
          break;
        case "change-fighter":
          matchManager.setScreen(GameScreen.FIGHTER_SELECT);
          this.menuIndex = 0;
          this.render();
          break;
        case "instructions":
          matchManager.setScreen(GameScreen.INSTRUCTIONS);
          this.menuIndex = 0;
          this.render();
          break;
        case "settings":
          matchManager.setScreen(GameScreen.SETTINGS);
          this.menuIndex = 0;
          this.render();
          break;
        case "credits":
          matchManager.setScreen(GameScreen.CREDITS);
          this.menuIndex = 0;
          this.render();
          break;
        case "main-menu":
          matchManager.setScreen(GameScreen.MAIN_MENU);
          this.menuIndex = 0;
          this.render();
          break;
        case "toggle-sound":
          matchManager.settings.sound = !matchManager.settings.sound;
          this.render();
          break;
        case "toggle-music":
          matchManager.settings.music = !matchManager.settings.music;
          const musicElem = document.querySelector("audio#theme-ken");
          if (musicElem) {
            if (matchManager.settings.music) musicElem.play().catch(() => {
            });
            else musicElem.pause();
          }
          this.render();
          break;
        case "toggle-fullscreen":
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {
            });
          } else {
            document.exitFullscreen().catch(() => {
            });
          }
          break;
        case "exit-game":
          alert("Street Fighter II - Returning to main screen.");
          matchManager.setScreen(GameScreen.MAIN_MENU);
          this.render();
          break;
      }
    }
    render() {
      const screen = matchManager.currentScreen;
      if (screen === GameScreen.FIGHTING) {
        this.container.innerHTML = this.renderInGameHud();
        this.container.className = "in-game-hud-mode";
        return;
      }
      this.container.className = "menu-overlay-mode";
      switch (screen) {
        case GameScreen.MAIN_MENU:
          this.container.innerHTML = this.renderMainMenu();
          break;
        case GameScreen.FIGHTER_SELECT:
          this.container.innerHTML = this.renderFighterSelect();
          break;
        case GameScreen.STAGE_SELECT:
          this.container.innerHTML = this.renderStageSelect();
          break;
        case GameScreen.ROUND_RESULT:
          this.container.innerHTML = this.renderRoundResult();
          break;
        case GameScreen.STAGE_COMPLETE:
          this.container.innerHTML = this.renderStageComplete();
          break;
        case GameScreen.FINAL_VICTORY:
          this.container.innerHTML = this.renderFinalVictory();
          break;
        case GameScreen.DEFEAT:
          this.container.innerHTML = this.renderDefeat();
          break;
        case GameScreen.INSTRUCTIONS:
          this.container.innerHTML = this.renderInstructions();
          break;
        case GameScreen.SETTINGS:
          this.container.innerHTML = this.renderSettings();
          break;
        case GameScreen.CREDITS:
          this.container.innerHTML = this.renderCredits();
          break;
      }
      this.bindClickEvents();
    }
    bindClickEvents() {
      const clickableElements = this.container.querySelectorAll("[data-action]");
      clickableElements.forEach((el, index) => {
        el.addEventListener("mouseenter", () => {
          const selectable = this.container.querySelectorAll(".menu-item, .fighter-card, .stage-item, .diff-btn");
          selectable.forEach((s) => s.classList.remove("selected"));
          el.classList.add("selected");
          this.menuIndex = index;
        });
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          this.triggerAction(el.dataset.action, el.dataset.value);
        });
      });
    }
    renderMainMenu() {
      const menuItems = [
        { label: "PLAY GAME", action: "play-game" },
        { label: "INSTRUCTIONS", action: "instructions" },
        { label: "SETTINGS", action: "settings" },
        { label: "CREDITS", action: "credits" },
        { label: "EXIT GAME", action: "exit-game" }
      ];
      return `
            <div class="arcade-card main-menu-card">
                <div class="logo-container">
                    <h1 class="game-title">STREET FIGHTER II</h1>
                    <div class="game-subtitle">CHAMPION EDITION // ARCADE</div>
                </div>

                <div class="menu-list">
                    ${menuItems.map((item, idx) => `
                            <div class="menu-item ${idx === this.menuIndex ? "selected" : ""}" data-action="${item.action}">
                                <span class="indicator">&gt;</span>
                                <span class="label">${item.label}</span>
                                <span class="indicator">&lt;</span>
                            </div>
                        `).join("")}
                </div>

                <div class="menu-footer">
                    <span class="key-hint"><kbd>UP</kbd> <kbd>DOWN</kbd> Navigate</span>
                    <span class="key-hint"><kbd>ENTER</kbd> / <kbd>SPACE</kbd> Select</span>
                    <span class="key-hint">Mouse Supported</span>
                </div>
            </div>
        `;
    }
    renderFighterSelect() {
      return `
            <div class="arcade-card fighter-select-card">
                <h2 class="screen-title">SELECT YOUR FIGHTER (STORY)</h2>
                <div class="roster-grid">
                    ${FIGHTERS.map((f, idx) => `
                        <div class="fighter-card ${idx === this.menuIndex ? "selected" : ""}" data-action="select-fighter" data-value="${idx}">
                            <div class="fighter-avatar-box">
                                <div class="avatar-portrait ${f.id.toLowerCase()}-portrait"></div>
                                <div class="fighter-glow-bar" style="background:${f.color}"></div>
                            </div>
                            <div class="fighter-info">
                                <div class="fighter-name">${f.name.toUpperCase()}</div>
                                <div class="fighter-title">${f.title}</div>
                                <div class="fighter-stats">
                                    <div class="stat-bar"><span>ATK</span><div class="bar-fill" style="width:${f.stats.attack}%"></div></div>
                                    <div class="stat-bar"><span>SPD</span><div class="bar-fill" style="width:${f.stats.speed}%"></div></div>
                                    <div class="stat-bar"><span>DEF</span><div class="bar-fill" style="width:${f.stats.defense}%"></div></div>
                                </div>
                            </div>
                        </div>
                    `).join("")}
                </div>

                <div class="menu-footer">
                    <span class="key-hint"><kbd>&uarr;</kbd> <kbd>&darr;</kbd> <kbd>&larr;</kbd> <kbd>&rarr;</kbd> Choose Fighter</span>
                    <span class="key-hint"><kbd>ENTER</kbd> Confirm Selection</span>
                    <span class="key-hint"><kbd>ESC</kbd> Main Menu</span>
                </div>
            </div>
        `;
    }
    renderStageSelect() {
      const currentFighter = matchManager.getPlayerFighter();
      const currentOpponent = matchManager.getOpponentFighter();
      return `
            <div class="arcade-card stage-select-card">
                <h2 class="screen-title">SELECT STAGE &amp; DIFFICULTY</h2>

                <div class="versus-preview">
                    <div class="fighter-badge">
                        <span class="role">PLAYER 1</span>
                        <span class="name">${currentFighter.name.toUpperCase()}</span>
                    </div>
                    <div class="vs-text">VS</div>
                    <div class="fighter-badge opponent">
                        <span class="role">CPU OPPONENT</span>
                        <span class="name">${currentOpponent.name.toUpperCase()}</span>
                    </div>
                </div>

                <div class="stage-section">
                    <div class="section-label">SELECT STAGE</div>
                    <div class="stage-list">
                        ${STAGES.map((s, idx) => `
                            <div class="stage-item ${idx === matchManager.selectedStageIndex ? "selected" : ""}" data-action="select-stage" data-value="${idx}">
                                <div class="stage-icon"></div>
                                <div class="stage-details">
                                    <div class="stage-name">${s.name}</div>
                                    <div class="stage-sub">${s.subtitle} // ${s.atmosphere}</div>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                </div>

                <div class="difficulty-section">
                    <div class="section-label">AI DIFFICULTY</div>
                    <div class="diff-btn-group">
                        ${DIFFICULTIES.map((d) => `
                            <div class="diff-btn ${d === matchManager.difficulty ? "active selected" : ""}" data-action="set-difficulty" data-value="${d}">
                                ${d}
                            </div>
                        `).join("")}
                    </div>
                </div>

                <div class="action-btn-row">
                    <button class="action-btn primary selected" data-action="start-match">
                        &gt; START BATTLE &lt;
                    </button>
                </div>

                <div class="menu-footer">
                    <span class="key-hint"><kbd>UP</kbd> <kbd>DOWN</kbd> Select Stage</span>
                    <span class="key-hint"><kbd>&larr;</kbd> <kbd>&rarr;</kbd> Change Difficulty</span>
                    <span class="key-hint"><kbd>ENTER</kbd> Start Fight</span>
                    <span class="key-hint"><kbd>ESC</kbd> Back</span>
                </div>
            </div>
        `;
    }
    renderInGameHud() {
      const p1 = matchManager.getPlayerFighter();
      const p2 = matchManager.getOpponentFighter();
      const stage = matchManager.getCurrentStage();
      const round = matchManager.currentRound;
      const p1Wins = matchManager.roundsWon[0];
      const p2Wins = matchManager.roundsWon[1];
      return `
            <div class="in-game-header">
                <div class="hud-box p1-hud">
                    <span class="hud-role">P1</span>
                    <span class="hud-name">${p1.name.toUpperCase()}</span>
                    <div class="round-marks">
                        <span class="mark ${p1Wins >= 1 ? "won" : ""}">[\u2713]</span>
                        <span class="mark ${p1Wins >= 2 ? "won" : ""}">[\u2713]</span>
                    </div>
                </div>

                <div class="hud-center">
                    <div class="hud-round-label">ROUND ${round}</div>
                    <div class="hud-stage-info">${stage.name} // ${matchManager.difficulty}</div>
                </div>

                <div class="hud-box p2-hud">
                    <div class="round-marks">
                        <span class="mark ${p2Wins >= 2 ? "won" : ""}">[\u2713]</span>
                        <span class="mark ${p2Wins >= 1 ? "won" : ""}">[\u2713]</span>
                    </div>
                    <span class="hud-name">${p2.name.toUpperCase()}</span>
                    <span class="hud-role">CPU</span>
                </div>
            </div>

            <div class="in-game-footer-hints">
                <span>MOVE: <kbd>WASD</kbd> or <kbd>&uarr;&darr;&larr;&rarr;</kbd></span>
                <span>PUNCH: <kbd>J</kbd> / <kbd>K</kbd> / <kbd>L</kbd> or <kbd>1</kbd> / <kbd>2</kbd> / <kbd>3</kbd></span>
                <span>KICK: <kbd>B</kbd> / <kbd>N</kbd> / <kbd>M</kbd> or <kbd>Q</kbd> / <kbd>E</kbd> / <kbd>R</kbd></span>
                <span>HADOUKEN: <kbd>S</kbd>, <kbd>D</kbd> + <kbd>PUNCH</kbd></span>
                <span><kbd>ESC</kbd> MENU</span>
            </div>
        `;
    }
    renderRoundResult() {
      const res = matchManager.roundResult || {};
      const isWin = res.isPlayerWin;
      const isMatchEnd = res.isMatchWon || res.isMatchLost;
      return `
            <div class="arcade-card result-card ${isWin ? "victory" : "defeat"}">
                <div class="result-badge ${isWin ? "victory" : "defeat"}">
                    ${isWin ? "VICTORY!" : "DEFEAT"}
                </div>

                <h1 class="winner-title">${(res.winnerName || "FIGHTER").toUpperCase()} WINS</h1>
                <div class="round-clear-subtitle">
                    ROUND ${res.roundNumber || matchManager.currentRound} ${isWin ? "CLEAR" : "LOST"}
                </div>

                <div class="score-breakdown">
                    <div class="score-row">
                        <span>ROUND SCORE:</span>
                        <span class="val">+${res.roundScore || 0}</span>
                    </div>
                    ${res.perfectWin ? `
                        <div class="score-row perfect">
                            <span>PERFECT BONUS:</span>
                            <span class="val">+2000</span>
                        </div>
                    ` : ""}
                    <div class="score-row total">
                        <span>TOTAL SCORE:</span>
                        <span class="val">${matchManager.score}</span>
                    </div>
                </div>

                <div class="menu-list action-buttons">
                    ${res.isMatchWon ? `
                        <div class="menu-item selected" data-action="next-stage">
                            &gt; STAGE CLEAR / NEXT STAGE &lt;
                        </div>
                    ` : isWin ? `
                        <div class="menu-item selected" data-action="next-round">
                            &gt; NEXT ROUND &lt;
                        </div>
                    ` : `
                        <div class="menu-item selected" data-action="retry-round">
                            &gt; RETRY ROUND &lt;
                        </div>
                    `}
                    <div class="menu-item" data-action="change-fighter">CHANGE FIGHTER</div>
                    <div class="menu-item" data-action="main-menu">MAIN MENU</div>
                </div>
            </div>
        `;
    }
    renderStageComplete() {
      const rank = matchManager.calculateRank();
      const stage = matchManager.getCurrentStage();
      return `
            <div class="arcade-card stage-clear-card victory">
                <div class="result-badge victory">STAGE CLEARED!</div>
                <h1 class="winner-title">ALL ROUNDS CLEARED</h1>
                <div class="round-clear-subtitle">${stage.name} CONQUERED</div>

                <div class="score-breakdown">
                    <div class="score-row">
                        <span>STAGE BONUS:</span>
                        <span class="val">+3000</span>
                    </div>
                    <div class="score-row total">
                        <span>TOTAL SCORE:</span>
                        <span class="val">${matchManager.score}</span>
                    </div>
                    <div class="score-row rank-row">
                        <span>PERFORMANCE RANK:</span>
                        <span class="rank-badge rank-${rank}">${rank}-RANK</span>
                    </div>
                </div>

                <div class="menu-list action-buttons">
                    <div class="menu-item selected" data-action="next-stage">
                        &gt; NEXT STAGE &lt;
                    </div>
                    <div class="menu-item" data-action="play-game">PLAY AGAIN</div>
                    <div class="menu-item" data-action="main-menu">MAIN MENU</div>
                </div>
            </div>
        `;
    }
    renderFinalVictory() {
      const fighter = matchManager.getPlayerFighter();
      const rank = matchManager.calculateRank();
      return `
            <div class="arcade-card victory-card victory">
                <div class="result-badge victory">VICTORY!</div>
                <h1 class="champion-title">STORY COMPLETED</h1>
                <div class="champion-name">${fighter.name.toUpperCase()}</div>
                <div class="champion-subtitle">SUPREME ARCADE CHAMPION!</div>

                <div class="score-breakdown">
                    <div class="score-row total">
                        <span>FINAL SCORE:</span>
                        <span class="val">${matchManager.score}</span>
                    </div>
                    <div class="score-row rank-row">
                        <span>FINAL RATING:</span>
                        <span class="rank-badge rank-${rank}">${rank}-RANK</span>
                    </div>
                </div>

                <div class="menu-list action-buttons">
                    <div class="menu-item selected" data-action="play-game">
                        &gt; PLAY AGAIN &lt;
                    </div>
                    <div class="menu-item" data-action="main-menu">MAIN MENU</div>
                </div>
            </div>
        `;
    }
    renderDefeat() {
      const res = matchManager.roundResult || {};
      return `
            <div class="arcade-card defeat-card defeat">
                <div class="result-badge defeat">DEFEAT</div>
                <h1 class="winner-title">${(res.winnerName || "OPPONENT").toUpperCase()} WINS</h1>
                <div class="round-clear-subtitle">ROUND ${matchManager.currentRound} LOST</div>

                <div class="menu-list action-buttons">
                    <div class="menu-item selected" data-action="retry-round">
                        &gt; RETRY ROUND &lt;
                    </div>
                    <div class="menu-item" data-action="change-fighter">CHANGE FIGHTER</div>
                    <div class="menu-item" data-action="main-menu">MAIN MENU</div>
                </div>
            </div>
        `;
    }
    renderInstructions() {
      return `
            <div class="arcade-card instructions-card">
                <h2 class="screen-title">INSTRUCTIONS &amp; COMBAT GUIDE</h2>

                <div class="instructions-content">
                    <div class="control-box">
                        <h3>PLAYER CONTROLS (WASD or ARROW KEYS)</h3>
                        <p><strong>Movement:</strong> <kbd>W</kbd> / <kbd>&uarr;</kbd> (Jump) &bull; <kbd>S</kbd> / <kbd>&darr;</kbd> (Crouch) &bull; <kbd>A</kbd> / <kbd>&larr;</kbd> (Move Left) &bull; <kbd>D</kbd> / <kbd>&rarr;</kbd> (Move Right)</p>
                        <p><strong>Punches:</strong> <kbd>J</kbd> / <kbd>U</kbd> / <kbd>1</kbd> (Light) &bull; <kbd>K</kbd> / <kbd>I</kbd> / <kbd>2</kbd> (Medium) &bull; <kbd>L</kbd> / <kbd>O</kbd> / <kbd>3</kbd> (Heavy)</p>
                        <p><strong>Kicks:</strong> <kbd>B</kbd> / <kbd>Q</kbd> / <kbd>4</kbd> (Light) &bull; <kbd>N</kbd> / <kbd>E</kbd> / <kbd>5</kbd> (Medium) &bull; <kbd>M</kbd> / <kbd>R</kbd> / <kbd>6</kbd> (Heavy)</p>
                        <p><strong>Special Move (Hadouken):</strong> Down, Forward + Punch (<kbd>S</kbd>, <kbd>D</kbd> + <kbd>J</kbd> or <kbd>&darr;</kbd>, <kbd>&rarr;</kbd> + <kbd>1</kbd>)</p>
                    </div>

                    <div class="control-box system-box">
                        <h3>SYSTEM CONTROLS</h3>
                        <p><kbd>ENTER</kbd> / <kbd>SPACE</kbd> = Confirm &bull; <kbd>ESC</kbd> = Back to Menu / Pause</p>
                        <p>Gamepads: Plug-and-play USB/Bluetooth Controllers supported automatically.</p>
                    </div>
                </div>

                <div class="menu-footer">
                    <button class="action-btn selected" data-action="main-menu">&gt; BACK TO MENU &lt;</button>
                </div>
            </div>
        `;
    }
    renderSettings() {
      const s = matchManager.settings;
      return `
            <div class="arcade-card settings-card">
                <h2 class="screen-title">SETTINGS</h2>

                <div class="settings-list">
                    <div class="setting-item">
                        <span>SOUND EFFECTS:</span>
                        <button class="toggle-btn ${s.sound ? "on" : "off"}" data-action="toggle-sound">
                            ${s.sound ? "ON" : "OFF"}
                        </button>
                    </div>

                    <div class="setting-item">
                        <span>STAGE MUSIC:</span>
                        <button class="toggle-btn ${s.music ? "on" : "off"}" data-action="toggle-music">
                            ${s.music ? "ON" : "OFF"}
                        </button>
                    </div>

                    <div class="setting-item">
                        <span>AI DIFFICULTY:</span>
                        <div class="diff-btn-group small">
                            ${DIFFICULTIES.map((d) => `
                                <div class="diff-btn ${d === matchManager.difficulty ? "active" : ""}" data-action="set-difficulty" data-value="${d}">
                                    ${d}
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <div class="setting-item">
                        <span>FULLSCREEN:</span>
                        <button class="toggle-btn" data-action="toggle-fullscreen">TOGGLE FULLSCREEN</button>
                    </div>
                </div>

                <div class="menu-footer">
                    <button class="action-btn selected" data-action="main-menu">&gt; BACK TO MENU &lt;</button>
                </div>
            </div>
        `;
    }
    renderCredits() {
      return `
            <div class="arcade-card credits-card">
                <h2 class="screen-title">CREDITS</h2>

                <div class="credits-body">
                    <div class="credit-section">
                        <h3>ORIGINAL GAME REMAKE</h3>
                        <p>Created by <strong>Iuri Torres</strong></p>
                        <p>Inspired by <strong>Shezzor's Dev Corner</strong> YouTube Playlist</p>
                    </div>

                    <div class="credit-section">
                        <h3>TECHNOLOGY</h3>
                        <p>Vanilla JavaScript ES6+ &bull; HTML5 Canvas 2D &bull; Web Audio API</p>
                        <p>Arcade State Machine &bull; CPU AI Engine &bull; Zero external runtime deps</p>
                    </div>

                    <div class="credit-section">
                        <h3>CHARACTERS &amp; AUDIO</h3>
                        <p>Street Fighter 2 &bull; Capcom CPS-1 Audio &amp; Sprites</p>
                    </div>
                </div>

                <div class="menu-footer">
                    <button class="action-btn selected" data-action="main-menu">&gt; BACK TO MENU &lt;</button>
                </div>
            </div>
        `;
    }
  };

  // src/StreetFighterGame.js
  var StreetFighterGame = class {
    context = getContext();
    frameTime = {
      previous: 0,
      secondsPassed: 0
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
        secondsPassed: (time - this.frameTime.previous) / 1e3,
        previous: time
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
  };

  // src/index.js
  window.addEventListener("load", function() {
    const game = new StreetFighterGame();
    game.start();
    function unlockAudio() {
      const music = document.querySelector("audio#theme-ken");
      if (music && music.paused) {
        music.play().catch(() => {
        });
      }
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    }
    window.addEventListener("click", unlockAudio);
    window.addEventListener("keydown", unlockAudio);
    window.addEventListener("touchstart", unlockAudio);
  });
})();
