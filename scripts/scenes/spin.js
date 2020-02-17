var scenes;
(function (scenes) {
    class Spin extends objects.Scene {
        constructor() {
            super();
            this.Start();
        }
        DisplayResults() {
            this.RemoveOldResult();
            for (let index = 0; index < this._spinResult.length; index++) {
                let result = this._spinResult[index];
                this._rolls[index] = new objects.Roll(result);
                this._rolls[index].x = this._rollXLoc[index];
                this.addChild(this._rolls[index]);
            }
        }
        RemoveOldResult() {
            for (let index = 0; index < this._rolls.length; index++) {
                this.removeChild(this._rolls[index]);
            }
        }
        Reels() {
            {
                var betLine = [" ", " ", " "];
                var outCome = [0, 0, 0];
                for (var spin = 0; spin < 3; spin++) {
                    outCome[spin] = Math.floor((Math.random() * 65) + 1);
                    switch (outCome[spin]) {
                        case this.checkRange(outCome[spin], 1, 27): // 41.5% probability
                            betLine[spin] = "blank";
                            this._blanks++;
                            break;
                        case this.checkRange(outCome[spin], 28, 37): // 15.4% probability
                            betLine[spin] = "grapes";
                            this._grapes++;
                            break;
                        case this.checkRange(outCome[spin], 38, 46): // 13.8% probability
                            betLine[spin] = "banana";
                            this._bananas++;
                            break;
                        case this.checkRange(outCome[spin], 47, 54): // 12.3% probability
                            betLine[spin] = "orange";
                            this._oranges++;
                            break;
                        case this.checkRange(outCome[spin], 55, 59): //  7.7% probability
                            betLine[spin] = "cherry";
                            this._cherries++;
                            break;
                        case this.checkRange(outCome[spin], 60, 62): //  4.6% probability
                            betLine[spin] = "bar";
                            this._bars++;
                            break;
                        case this.checkRange(outCome[spin], 63, 64): //  3.1% probability
                            betLine[spin] = "lemon";
                            this._lemons++;
                            break;
                        case this.checkRange(outCome[spin], 65, 65): //  1.5% probability
                            betLine[spin] = "seven";
                            this._sevens++;
                            break;
                    }
                }
                return betLine;
            }
        }
        /* This function calculates the player's winnings, if any */
        DetermineWinnings() {
            if (this._blanks == 0) {
                if (this._grapes == 3) {
                    this._winnings = this._moneyBet * 10;
                }
                else if (this._bananas == 3) {
                    this._winnings = this._moneyBet * 20;
                }
                else if (this._oranges == 3) {
                    this._winnings = this._moneyBet * 30;
                }
                else if (this._cherries == 3) {
                    this._winnings = this._moneyBet * 40;
                }
                else if (this._bars == 3) {
                    this._winnings = this._moneyBet * 50;
                }
                else if (this._lemons == 3) {
                    this._winnings = this._moneyBet * 75;
                }
                else if (this._sevens == 3) {
                    this._winnings = this._moneyBet * 100;
                }
                else if (this._grapes == 2) {
                    this._winnings = this._moneyBet * 2;
                }
                else if (this._bananas == 2) {
                    this._winnings = this._moneyBet * 2;
                }
                else if (this._oranges == 2) {
                    this._winnings = this._moneyBet * 3;
                }
                else if (this._cherries == 2) {
                    this._winnings = this._moneyBet * 4;
                }
                else if (this._bars == 2) {
                    this._winnings = this._moneyBet * 5;
                }
                else if (this._lemons == 2) {
                    this._winnings = this._moneyBet * 10;
                }
                else if (this._sevens == 2) {
                    this._winnings = this._moneyBet * 20;
                }
                else if (this._sevens == 1) {
                    this._winnings = this._moneyBet * 5;
                }
                else {
                    this._winnings = this._moneyBet * 1;
                }
                this.showWinMessage();
            }
            else {
                this.showLossMessage();
            }
        }
        /* Check to see if the player won the jackpot */
        checkJackPot() {
            /* compare two random values */
            var jackPotTry = Math.floor(Math.random() * 51 + 1);
            var jackPotWin = Math.floor(Math.random() * 51 + 1);
            if (jackPotTry == jackPotWin) {
                alert("You Won the $" + this._jackpot + " Jackpot!!");
                this._customerMney += this._jackpot;
                this._jackpot = 1000;
            }
        }
        /* Utility function to show a win message and increase player money */
        showWinMessage() {
            createjs.Sound.play("goodboy");
            this._customerMney += this._winnings;
            this.ResetFruitTally();
            this.checkJackPot();
        }
        /* Utility function to show a loss message and reduce player money */
        showLossMessage() {
            createjs.Sound.play("poker");
            this._customerMney -= this._moneyBet;
            this.ResetFruitTally();
        }
        /* Utility function to check if a value falls within a range of bounds */
        checkRange(value, lowerBounds, upperBounds) {
            if (value >= lowerBounds && value <= upperBounds) {
                return value;
            }
            else {
                return !value;
            }
        }
        // event handlers
        ResetEvent(event) {
            this.Reset();
        }
        Quit(event = null) {
            managers.Game.currentState = config.Scene.START;
            this.Destroy();
        }
        /* When the player clicks the spin button the game kicks off */
        Spin(event) {
            this._spinResult = this.Reels();
            // method to display results on reel
            this.DisplayResults();
            this.DetermineWinnings();
        }
        //Update Methods
        // Changes to over scene if money is 0 or below
        CheckMoney() {
            if (this._customerMney <= 0) {
                this.Quit();
            }
        }
        // Checks and updates the bet amount
        // Hides spin button if invalid bet
        CheckInput() {
            if (!isNaN(Number(managers.Game.playerBet.value))) {
                this._moneyBet = parseInt(managers.Game.playerBet.value);
                if (this._moneyBet <= this._customerMney && this._moneyBet > 0) {
                    if (!this._buttonSpin.IsEnabled) {
                        this._buttonSpin.IsEnabled = true;
                        this._buttonSpin.addEventListener("click", this.Spin);
                    }
                }
                else {
                    this._buttonSpin.IsEnabled = false;
                    this._buttonSpin.off("click", this.Spin);
                }
            }
            else {
                this._buttonSpin.IsEnabled = false;
                this._buttonSpin.off("click", this.Spin);
            }
        }
        // public methods
        /* Utility function to reset the player stats */
        ResetFruitTally() {
            this._grapes = 0;
            this._bananas = 0;
            this._oranges = 0;
            this._cherries = 0;
            this._bars = 0;
            this._lemons = 0;
            this._sevens = 0;
            this._blanks = 0;
        }
        // places the objects in the play scene
        Main() {
            this.addChild(this._playPic);
            this.addChild(this._slot);
            this.addChild(this._Bet);
            this.addChild(this._jackPot);
            this.addChild(this._money);
            this.addChild(this._buttonQuit);
            this.addChild(this._buttonReset);
            this.addChild(this._buttonSpin);
        }
        // instatniates the Play scene
        Start() {
            // resets the bet input field
            managers.Game.playerBet.value = "";
            managers.Game.playerBet.style.display = "inline";
            // Background objs
            this._playPic = new objects.Background("playBackground");
            this._slot = new objects.Background("slotMachine");
            // Label objs
            this._Bet = new objects.Label("Bet:", "30px", "Consolas", "#ffffff", 210, 340, false);
            this._jackPot = new objects.Label("Jackpot:", "30px", "Consolas", "#ffffff", 220, 55, false);
            this._money = new objects.Label("Money:", "30px", "Consolas", "#ffffff", 200, 273, false);
            // Button objs
            this._buttonQuit = new objects.Button("quitButton", 530, 30, true);
            this._buttonReset = new objects.Button("resetButton", 530, 80, true);
            this._buttonSpin = new objects.Button("spinButton", 530, 300, true);
            // Roll array. The individual reels are created after each spin
            this._rolls = new Array();
            // instantiates the x coordinates for the reels
            this._rollXLoc = new Array();
            this._rollXLoc[0] = 210;
            this._rollXLoc[1] = 286;
            this._rollXLoc[2] = 362;
            // Places the slot machine in the center of the canvas
            this._slot.x = (-20);
            // Binding event handlers to the play scene
            this.Quit = this.Quit.bind(this);
            this.ResetEvent = this.ResetEvent.bind(this);
            this.Spin = this.Spin.bind(this);
            // event listeners
            this._buttonQuit.addEventListener("click", this.Quit);
            this._buttonReset.addEventListener("click", this.ResetEvent);
            this.Main();
            this.Reset();
        }
        Update() {
            this.CheckInput();
            this._jackPot.text = "Jackpot: $" + this._jackpot;
            this._money.text = "Money: $" + this._customerMney;
            this.CheckMoney();
        }
        Reset() {
            this._spinResult = ["orange", "orange", "orange"];
            this.DisplayResults();
            this.ResetFruitTally();
            this._customerMney = 1000;
            this._winnings = 0;
            this._jackpot = 5000;
            this._moneyBet = 0;
        }
        Destroy() {
            super.Destroy();
        }
    }
    scenes.Spin = Spin;
})(scenes || (scenes = {}));
//# sourceMappingURL=spin.js.map