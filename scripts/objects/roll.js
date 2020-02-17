var objects;
(function (objects) {
    class Roll extends objects.GameObject {
        constructor(imageString) {
            super(imageString);
            this.Start();
        }
        Start() {
            this.y = 180;
        }
        Update() {
        }
        Reset() {
        }
        Destroy() {
        }
    }
    objects.Roll = Roll;
})(objects || (objects = {}));
//# sourceMappingURL=roll.js.map