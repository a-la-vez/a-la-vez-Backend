"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = __importDefault(require("./routes/auth"));
var post_1 = __importDefault(require("./routes/post"));
var index_1 = __importDefault(require("./routes/index"));
exports.default = (function () {
    var app = express_1.Router();
    auth_1.default(app);
    post_1.default(app);
    index_1.default(app);
    return app;
});
//# sourceMappingURL=index.js.map