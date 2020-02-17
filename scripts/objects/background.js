var objects;
(function (objects) {
    // Background class used for the game background
    class Background extends objects.GameObject {
        constructor(imageString) {
            super(imageString);
        }
        Start() {
        }
        Update() {
        }
        Reset() {
        }
        Destroy() {
        }
    }
    objects.Background = Background;
})(objects || (objects = {}));
//# sourceMappingURL=background.js.map