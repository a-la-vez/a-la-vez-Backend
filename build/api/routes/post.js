"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var method_override_1 = __importDefault(require("method-override"));
var route = express_1.Router();
exports.default = (function (app) {
    app.use(method_override_1.default("_method"));
    app.use("/post", route);
    route.post("/write", function (req, res) {
        var _a = req.body, title = _a.title, content = _a.content;
        // const post = 
    });
    route.post("/update", function () {
    });
    route.post("/delete", function () {
    });
});
//# sourceMappingURL=post.js.map