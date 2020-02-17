module scenes{
    export class GameOver extends objects.Scene{
        
        private _background:objects.Background;
        private _gameOver:objects.Label;
        private _restartButton:objects.Button;
        constructor() {
            super();

            this.Start();
        }

        public Main(): void {
            
            this.addChild(this._background);

            this.addChild(this._restartButton);

            this.addChild(this._gameOver);


            this._restartButton.on("click", ()=>{
                managers.Game.currentState = config.Scene.SPIN;
            })
        }        
        public Start(): void {
            this._restartButton = new objects.Button("restartButton", 320, 360, true);
            this._background = new objects.Background("idiot");
            createjs.Sound.play("haha");

            this._gameOver = new objects.Label("HaHaHaHaHa Idoit.. You lost your money ! ^_^ ", "30px", "Consolas", "#FFFF00", 320, 240, true);

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