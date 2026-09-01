export const GameScreen = {
    MAIN_MENU: 'MAIN_MENU',
    FIGHTER_SELECT: 'FIGHTER_SELECT',
    STAGE_SELECT: 'STAGE_SELECT',
    FIGHTING: 'FIGHTING',
    ROUND_RESULT: 'ROUND_RESULT',
    STAGE_COMPLETE: 'STAGE_COMPLETE',
    FINAL_VICTORY: 'FINAL_VICTORY',
    DEFEAT: 'DEFEAT',
    INSTRUCTIONS: 'INSTRUCTIONS',
    SETTINGS: 'SETTINGS',
    CREDITS: 'CREDITS',
};

export const FIGHTERS = [
    {
        id: 'Ken',
        baseClass: 'Ken',
        name: 'Ken Masters',
        title: 'The Blazing Dragon',
        color: '#ff3b30',
        stats: { attack: 85, speed: 90, defense: 80 },
        avatar: 'ken-avatar',
    },
    {
        id: 'Ryu',
        baseClass: 'Ryu',
        name: 'Ryu',
        title: 'The Wandering Warrior',
        color: '#ffffff',
        stats: { attack: 90, speed: 80, defense: 85 },
        avatar: 'ryu-avatar',
    },
    {
        id: 'Kaelen',
        baseClass: 'Ryu',
        name: 'Kaelen Vance',
        title: 'Cyber Strike Specialist',
        color: '#00f0ff',
        stats: { attack: 92, speed: 82, defense: 86 },
        avatar: 'kaelen-avatar',
    },
    {
        id: 'Vespera',
        baseClass: 'Ken',
        name: 'Vespera Vex',
        title: 'Shadow Assassin',
        color: '#af52de',
        stats: { attack: 82, speed: 95, defense: 78 },
        avatar: 'vespera-avatar',
    },
    {
        id: 'Omega',
        baseClass: 'Ryu',
        name: 'Omega Prime',
        title: 'Heavy Vanguard',
        color: '#ff9500',
        stats: { attack: 95, speed: 75, defense: 92 },
        avatar: 'omega-avatar',
    },
];

export const STAGES = [
    {
        id: 'neo_city',
        name: 'NEO CITY',
        subtitle: 'Harbor District - 2088',
        filter: 'none',
        atmosphere: 'Neon Harbor Skyline',
    },
    {
        id: 'tokyo_night',
        name: 'TOKYO NIGHT',
        subtitle: 'Midnight Docks',
        filter: 'hue-rotate(210deg) saturate(1.4) brightness(0.85)',
        atmosphere: 'Deep Blue Cyber Night',
    },
    {
        id: 'cyber_arena',
        name: 'CYBER ARENA',
        subtitle: 'Virtual Grid Port',
        filter: 'hue-rotate(150deg) saturate(1.6) contrast(1.1)',
        atmosphere: 'Matrix Cyan Glow',
    },
    {
        id: 'rooftop',
        name: 'ROOFTOP',
        subtitle: 'Sunset Overpass',
        filter: 'sepia(0.5) hue-rotate(330deg) saturate(1.5)',
        atmosphere: 'Golden Hour Dusk',
    },
    {
        id: 'training_dojo',
        name: 'TRAINING DOJO',
        subtitle: 'Simulation Zone',
        filter: 'grayscale(0.6) contrast(1.2) brightness(1.05)',
        atmosphere: 'Monochrome Holodeck',
    },
];

export const DIFFICULTIES = ['EASY', 'MEDIUM', 'HARD'];

class MatchManager {
    currentScreen = GameScreen.MAIN_MENU;
    selectedFighterIndex = 0;
    selectedOpponentIndex = 1;
    selectedStageIndex = 0;
    difficulty = 'MEDIUM';
    isCpu = true;

    // Match progression
    roundsToWin = 2;
    currentRound = 1;
    roundsWon = [0, 0]; // [P1 wins, P2 wins]
    roundHistory = [];  // record of each round winner
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
        fullscreen: false,
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
        // Choose a different fighter as opponent for story progression
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
            roundScore += 1000;
            if (perfectWin) roundScore += 2000;
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
            isMatchLost,
        };

        return this.roundResult;
    }

    advanceRound() {
        this.currentRound += 1;
        this.currentScreen = GameScreen.FIGHTING;
    }

    advanceStage() {
        this.score += 3000; // Stage clear bonus
        this.selectedStageIndex = (this.selectedStageIndex + 1);

        if (this.selectedStageIndex >= STAGES.length) {
            // Final Victory!
            this.currentScreen = GameScreen.FINAL_VICTORY;
        } else {
            // Next Stage
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

        if (score >= 12000 && damage <= 80) return 'S';
        if (score >= 9000 && damage <= 160) return 'A';
        if (score >= 6000) return 'B';
        if (score >= 3000) return 'C';
        return 'D';
    }
}

export const matchManager = new MatchManager();
