(function () {
    //Change to deploy again
    let canvas;
    let stage;
    let manager;
    let currentScene;
    let currentState;
    let manifest = [
        { id: "slotMachine", src: "./Assets/images/slotMachine.png" },
        { id: "startBackground", src: "./Assets/images/startBackground.png" },
        { id: "playBackground", src: "./Assets/images/playBackground.png" },
        { id: "idiot", src: "./Assets/images/idiot.png" },
        { id: "restartButton", src: "./Assets/images/button_restart.png" },
        { id: "quitButton", src: "./Assets/images/button_quit.png" },
        { id: "resetButton", src: "./Assets/images/button_reset.png" },
        { id: "spinButton", src: "./Assets/images/button_spin.png" },
        { id: "playButton", src: "./Assets/images/button_play.png" },
        { id: "banana", src: "./Assets/images/banana.png" },
        { id: "bar", src: "./Assets/images/bar.png" },
        { id: "cherry", src: "./Assets/images/cherry.png" },
        { id: "grapes", src: "./Assets/images/grapes.png" },
        { id: "lemon", src: "./Assets/images/lemon.png" },
        { id: "orange", src: "./Assets/images/orange.png" },
        { id: "spin", src: "./Assets/images/spin.png" },
        { id: "seven", src: "./Assets/images/seven.png" },
        { id: "blank", src: "./Assets/images/blank.png" },
        { id: "poker", src: "./Assets/sounds/poker.wav" },
        { id: "goodboy", src: "./Assets/sounds/goodboy.wav" },
        { id: "haha", src: "./Assets/sounds/haha.wav" },
        { id: "intro", src: "./Assets/sounds/intro.wav" }
    ];
    function Init() {
        manager = new createjs.LoadQueue();
        managers.Game.manager = manager;
        manager.installPlugin(createjs.Sound);
        manager.loadManifest(manifest);
        manager.on("complete", Start);
    }
    function Start() {
        console.log(`%c Game Started...`, "color: blue; font-size: 20px;");
        canvas = document.getElementsByTagName("canvas")[0];
        managers.Game.playerBet = document.getElementsByTagName("input")[0];
        stage = new createjs.Stage(canvas);
        managers.Game.stage = stage;
        stage.enableMouseOver(20);
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick", Update);
        currentState = config.Scene.START;
        managers.Game.currentState = config.Scene.START;
        Main();
    }
    function Update() {
        if (currentState != managers.Game.currentState) {
            currentState = managers.Game.currentState;
            Main();
        }
        stage.update();
        currentScene.Update();
    }
    function Main() {
        if (currentScene != null) {
            currentScene.Destroy();
            stage.removeAllChildren();
        }
        managers.Game.playerBet.style.display = "none";
        switch (currentState) {
            case config.Scene.START:
                currentScene = new scenes.Start;
                break;
            case config.Scene.SPIN:
                currentScene = new scenes.Spin;
                break;
            case config.Scene.GAMEOVER:
                currentScene = new scenes.GameOver;
                break;
        }
        stage.addChild(currentScene);
    }
    window.addEventListener("load", Init);
})();
//# sourceMappingURL=game.js.map