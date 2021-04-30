"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var route = express_1.Router();
exports.default = (function (app) {
    app.use('/auth', route);
    route.post("/login", function (req, res) {
        res.redirect("https://developer-api.dsmkr.com?redirect=");
    });
    route.post("/:id", function () {
    });
});
//# sourceMappingURL=auth.js.map