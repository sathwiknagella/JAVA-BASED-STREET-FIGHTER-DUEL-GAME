import {
    GameScreen,
    FIGHTERS,
    STAGES,
    DIFFICULTIES,
    matchManager,
} from '../state/matchManager.js';

export class UIManager {
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
        let ui = document.getElementById('game-ui');
        if (!ui) {
            ui = document.createElement('div');
            ui.id = 'game-ui';
            document.body.appendChild(ui);
        }
        this.container = ui;
    }

    bindEvents() {
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
    }

    handleKeyDown(e) {
        const screen = matchManager.currentScreen;

        if (screen === GameScreen.FIGHTING) {
            if (e.code === 'Escape') {
                e.preventDefault();
                matchManager.setScreen(GameScreen.MAIN_MENU);
                this.render();
            }
            return;
        }

        if (['ArrowUp', 'KeyW'].includes(e.code)) {
            e.preventDefault();
            this.navigateMenu(-1);
        } else if (['ArrowDown', 'KeyS'].includes(e.code)) {
            e.preventDefault();
            this.navigateMenu(1);
        } else if (['ArrowLeft', 'KeyA'].includes(e.code)) {
            e.preventDefault();
            this.navigateHorizontal(-1);
        } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
            e.preventDefault();
            this.navigateHorizontal(1);
        } else if (['Enter', 'Space'].includes(e.code)) {
            e.preventDefault();
            this.selectCurrentOption();
        } else if (e.code === 'Escape') {
            e.preventDefault();
            this.handleBack();
        }
    }

    navigateMenu(direction) {
        const items = this.container.querySelectorAll('.menu-item, .fighter-card, .stage-item, .diff-btn');
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
                item.classList.add('selected');
                item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            } else {
                item.classList.remove('selected');
            }
        });
    }

    selectCurrentOption() {
        const selected = this.container.querySelector('.menu-item.selected, .fighter-card.selected, .action-btn.selected, .stage-item.selected');
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
            case 'play-game':
                matchManager.setScreen(GameScreen.FIGHTER_SELECT);
                this.menuIndex = matchManager.selectedFighterIndex;
                this.render();
                break;

            case 'select-fighter':
                const fIdx = parseInt(value, 10);
                matchManager.selectFighter(fIdx);
                matchManager.setScreen(GameScreen.STAGE_SELECT);
                this.menuIndex = matchManager.selectedStageIndex;
                this.render();
                break;

            case 'select-stage':
                const sIdx = parseInt(value, 10);
                matchManager.selectStage(sIdx);
                this.render();
                break;

            case 'set-difficulty':
                matchManager.setDifficulty(value);
                this.render();
                break;

            case 'start-match':
                matchManager.startMatch();
                this.render();
                if (this.game) {
                    this.game.startMatch();
                }
                break;

            case 'next-round':
                matchManager.advanceRound();
                this.render();
                if (this.game) {
                    this.game.nextRound();
                }
                break;

            case 'next-stage':
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

            case 'retry-round':
                matchManager.retryRound();
                this.render();
                if (this.game) {
                    this.game.nextRound();
                }
                break;

            case 'change-fighter':
                matchManager.setScreen(GameScreen.FIGHTER_SELECT);
                this.menuIndex = 0;
                this.render();
                break;

            case 'instructions':
                matchManager.setScreen(GameScreen.INSTRUCTIONS);
                this.menuIndex = 0;
                this.render();
                break;

            case 'settings':
                matchManager.setScreen(GameScreen.SETTINGS);
                this.menuIndex = 0;
                this.render();
                break;

            case 'credits':
                matchManager.setScreen(GameScreen.CREDITS);
                this.menuIndex = 0;
                this.render();
                break;

            case 'main-menu':
                matchManager.setScreen(GameScreen.MAIN_MENU);
                this.menuIndex = 0;
                this.render();
                break;

            case 'toggle-sound':
                matchManager.settings.sound = !matchManager.settings.sound;
                this.render();
                break;

            case 'toggle-music':
                matchManager.settings.music = !matchManager.settings.music;
                const musicElem = document.querySelector('audio#theme-ken');
                if (musicElem) {
                    if (matchManager.settings.music) musicElem.play().catch(() => {});
                    else musicElem.pause();
                }
                this.render();
                break;

            case 'toggle-fullscreen':
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen().catch(() => {});
                } else {
                    document.exitFullscreen().catch(() => {});
                }
                break;

            case 'exit-game':
                alert('Street Fighter II - Returning to main screen.');
                matchManager.setScreen(GameScreen.MAIN_MENU);
                this.render();
                break;
        }
    }

    render() {
        const screen = matchManager.currentScreen;

        if (screen === GameScreen.FIGHTING) {
            this.container.innerHTML = this.renderInGameHud();
            this.container.className = 'in-game-hud-mode';
            return;
        }

        this.container.className = 'menu-overlay-mode';

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
        const clickableElements = this.container.querySelectorAll('[data-action]');
        clickableElements.forEach((el, index) => {
            el.addEventListener('mouseenter', () => {
                const selectable = this.container.querySelectorAll('.menu-item, .fighter-card, .stage-item, .diff-btn');
                selectable.forEach(s => s.classList.remove('selected'));
                el.classList.add('selected');
                this.menuIndex = index;
            });
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                this.triggerAction(el.dataset.action, el.dataset.value);
            });
        });
    }

    renderMainMenu() {
        const menuItems = [
            { label: 'PLAY GAME', action: 'play-game' },
            { label: 'INSTRUCTIONS', action: 'instructions' },
            { label: 'SETTINGS', action: 'settings' },
            { label: 'CREDITS', action: 'credits' },
            { label: 'EXIT GAME', action: 'exit-game' },
        ];

        return `
            <div class="arcade-card main-menu-card">
                <div class="logo-container">
                    <h1 class="game-title">STREET FIGHTER II</h1>
                    <div class="game-subtitle">CHAMPION EDITION // ARCADE</div>
                </div>

                <div class="menu-list">
                    ${menuItems
                        .map((item, idx) => `
                            <div class="menu-item ${idx === this.menuIndex ? 'selected' : ''}" data-action="${item.action}">
                                <span class="indicator">&gt;</span>
                                <span class="label">${item.label}</span>
                                <span class="indicator">&lt;</span>
                            </div>
                        `)
                        .join('')}
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
                        <div class="fighter-card ${idx === this.menuIndex ? 'selected' : ''}" data-action="select-fighter" data-value="${idx}">
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
                    `).join('')}
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
                            <div class="stage-item ${idx === matchManager.selectedStageIndex ? 'selected' : ''}" data-action="select-stage" data-value="${idx}">
                                <div class="stage-icon"></div>
                                <div class="stage-details">
                                    <div class="stage-name">${s.name}</div>
                                    <div class="stage-sub">${s.subtitle} // ${s.atmosphere}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="difficulty-section">
                    <div class="section-label">AI DIFFICULTY</div>
                    <div class="diff-btn-group">
                        ${DIFFICULTIES.map((d) => `
                            <div class="diff-btn ${d === matchManager.difficulty ? 'active selected' : ''}" data-action="set-difficulty" data-value="${d}">
                                ${d}
                            </div>
                        `).join('')}
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
                        <span class="mark ${p1Wins >= 1 ? 'won' : ''}">[✓]</span>
                        <span class="mark ${p1Wins >= 2 ? 'won' : ''}">[✓]</span>
                    </div>
                </div>

                <div class="hud-center">
                    <div class="hud-round-label">ROUND ${round}</div>
                    <div class="hud-stage-info">${stage.name} // ${matchManager.difficulty}</div>
                </div>

                <div class="hud-box p2-hud">
                    <div class="round-marks">
                        <span class="mark ${p2Wins >= 2 ? 'won' : ''}">[✓]</span>
                        <span class="mark ${p2Wins >= 1 ? 'won' : ''}">[✓]</span>
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
            <div class="arcade-card result-card ${isWin ? 'victory' : 'defeat'}">
                <div class="result-badge ${isWin ? 'victory' : 'defeat'}">
                    ${isWin ? 'VICTORY!' : 'DEFEAT'}
                </div>

                <h1 class="winner-title">${(res.winnerName || 'FIGHTER').toUpperCase()} WINS</h1>
                <div class="round-clear-subtitle">
                    ROUND ${res.roundNumber || matchManager.currentRound} ${isWin ? 'CLEAR' : 'LOST'}
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
                    ` : ''}
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
                <h1 class="winner-title">${(res.winnerName || 'OPPONENT').toUpperCase()} WINS</h1>
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
                        <button class="toggle-btn ${s.sound ? 'on' : 'off'}" data-action="toggle-sound">
                            ${s.sound ? 'ON' : 'OFF'}
                        </button>
                    </div>

                    <div class="setting-item">
                        <span>STAGE MUSIC:</span>
                        <button class="toggle-btn ${s.music ? 'on' : 'off'}" data-action="toggle-music">
                            ${s.music ? 'ON' : 'OFF'}
                        </button>
                    </div>

                    <div class="setting-item">
                        <span>AI DIFFICULTY:</span>
                        <div class="diff-btn-group small">
                            ${DIFFICULTIES.map(d => `
                                <div class="diff-btn ${d === matchManager.difficulty ? 'active' : ''}" data-action="set-difficulty" data-value="${d}">
                                    ${d}
                                </div>
                            `).join('')}
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
}
