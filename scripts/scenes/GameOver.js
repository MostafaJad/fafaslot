var scenes;
(function (scenes) {
    class GameOver extends objects.Scene {
        constructor() {
            super();
            this.Start();
        }
        Main() {
            this.addChild(this._background);
            this.addChild(this._restartButton);
            this.addChild(this._gameOver);
            this._restartButton.on("click", () => {
                managers.Game.currentState = config.Scene.SPIN;
            });
        }
        Start() {
            this._restartButton = new objects.Button("restartButton", 320, 360, true);
            this._background = new objects.Background("idiot");
            createjs.Sound.play("haha");
            this._gameOver = new objects.Label("HaHaHaHaHa Idoit.. You lost your money ! ^_^ ", "30px", "Consolas", "#FFFF00", 320, 240, true);
            this.Main();
        }
        Update() {
        }
        Reset() {
        }
        Destroy() {
            super.Destroy();
        }
    }
    scenes.GameOver = GameOver;
})(scenes || (scenes = {}));
//# sourceMappingURL=GameOver.js.map