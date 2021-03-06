module scenes {
    export class Start extends objects.Scene {
        private _background: objects.Background;
        private _playButton: objects.Button;

        constructor() {
            super();
            this.Start();
        }
        public Main(): void {

            this.addChild(this._background);

            this.addChild(this._playButton);


            this._playButton.on("click", () => {
                managers.Game.currentState = config.Scene.SPIN;
            })
        }
        public Start(): void {
            this._playButton = new objects.Button("playButton", 320, 420, true);
            this._background = new objects.Background("startBackground");
            createjs.Sound.play("intro");
            this.Main();
        }
        public Update(): void {

        }
        public Reset(): void {

        }
        public Destroy(): void {
            super.Destroy();
        }
    }
}