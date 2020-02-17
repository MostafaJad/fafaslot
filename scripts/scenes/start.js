var scenes;
(function (scenes) {
    class Start extends objects.Scene {
        constructor() {
            super();
            this.Start();
        }
        Main() {
            this.addChild(this._background);
            this.addChild(this._playButton);
            this._playButton.on("click", () => {
                managers.Game.currentState = config.Scene.SPIN;
            });
        }
        Start() {
            this._playButton = new objects.Button("playButton", 320, 420, true);
            this._background = new objects.Background("startBackground");
            createjs.Sound.play("intro");
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
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=start.js.map