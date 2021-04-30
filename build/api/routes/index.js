"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var path = require("path");
var route = express_1.Router();
exports.default = (function (app) {
    app.use("/", route);
    route.get("/", function (req, res) {
        res.sendFile(path.resolve('src/html/index.html'));
    });
});
//# sourceMappingURL=index.js.map