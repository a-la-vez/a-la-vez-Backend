"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path = require("path");
const route = express_1.Router();
exports.default = (app) => {
    app.use("/", route);
    route.get("/", (req, res) => {
        res.sendFile(path.resolve('src/html/index.html'));
    });
};
//# sourceMappingURL=index.js.map