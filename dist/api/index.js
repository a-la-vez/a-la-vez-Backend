"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("./routes/auth");
const post_1 = require("./routes/post");
const index_1 = require("./routes/index");
const comment_1 = require("./routes/comment");
exports.default = () => {
    const app = express_1.Router();
    auth_1.default(app);
    post_1.default(app);
    index_1.default(app);
    comment_1.default(app);
    return app;
};
//# sourceMappingURL=index.js.map