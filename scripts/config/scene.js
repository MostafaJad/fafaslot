var config;
(function (config) {
    let Scene;
    (function (Scene) {
        Scene[Scene["START"] = 0] = "START";
        Scene[Scene["SPIN"] = 1] = "SPIN";
        Scene[Scene["GAMEOVER"] = 2] = "GAMEOVER";
    })(Scene = config.Scene || (config.Scene = {}));
})(config || (config = {}));
//# sourceMappingURL=scene.js.map