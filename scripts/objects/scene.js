var objects;
(function (objects) {
    class Scene extends createjs.Container {
        constructor() {
            super();
        }
        Destroy() {
            this.removeAllEventListeners;
            this.removeAllChildren;
        }
    }
    objects.Scene = Scene;
})(objects || (objects = {}));
//# sourceMappingURL=scene.js.map