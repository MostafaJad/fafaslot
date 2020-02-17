module managers {
    // game manager class that holds global variables
    export class Game {
        // Global
        public static manager:createjs.LoadQueue;
        public static stage:createjs.Stage;
        public static currentState:config.Scene;
        public static playerBet:HTMLInputElement;
    }
}