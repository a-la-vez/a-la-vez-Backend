"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var jsonwebtoken_1 = require("jsonwebtoken");
var typeorm_1 = require("typeorm");
var Comment_1 = require("../../entity/Comment");
var Post_1 = require("../../entity/Post");
var route = express_1.Router();
exports.default = (function (app) {
    app.use("/comment", route);
    route.get("/findAll/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var post, comments;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Post_1.Post.findById(Number(req.params.id))];
                case 1:
                    post = _a.sent();
                    return [4 /*yield*/, Comment_1.Comment.findByPostID(Number(req.params.id))];
                case 2:
                    comments = _a.sent();
                    if (comments && post) {
                        return [2 /*return*/, res.json({ "comments": comments })];
                    }
                    else {
                        return [2 /*return*/, res.status(400).json("can't find post")];
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    route.post("/write", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user, _a, content, postId, day, year, month, date, newComment;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    user = "";
                    if (req.headers.authorization && process.env.TOKEN_SECRET) {
                        user = jsonwebtoken_1.verify(req.headers.authorization.substring(7), process.env.TOKEN_SECRET);
                    }
                    else {
                        return [2 /*return*/, res.status(400).json("No Token")];
                    }
                    _a = req.body, content = _a.content, postId = _a.postId;
                    day = new Date();
                    year = day.getFullYear();
                    month = day.getMonth() + 1;
                    date = day.getDate();
                    newComment = new Comment_1.Comment;
                    newComment.Content = content;
                    newComment.PostId = postId;
                    newComment.userId = user.id;
                    newComment.createdAt = new Date(year + "-" + month + "-" + date);
                    newComment.updatedAt = new Date(year + "-" + month + "-" + date);
                    return [4 /*yield*/, newComment.save()];
                case 1:
                    _b.sent();
                    return [2 /*return*/, res.json("commited")];
            }
        });
    }); });
    route.put("/update/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var content, day, year, month, date, updateComment;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    content = req.body.content;
                    day = new Date();
                    year = day.getFullYear();
                    month = day.getMonth() + 1;
                    date = day.getDate();
                    return [4 /*yield*/, typeorm_1.getRepository(Comment_1.Comment).findOne(req.params.id)];
                case 1:
                    updateComment = _a.sent();
                    if (!updateComment) return [3 /*break*/, 3];
                    updateComment.Content = content;
                    updateComment.updatedAt = new Date(year + "-" + month + "-" + date);
                    return [4 /*yield*/, updateComment.save()];
                case 2:
                    _a.sent();
                    return [2 /*return*/, res.json("updated")];
                case 3: return [2 /*return*/, res.json("can't find")];
            }
        });
    }); });
    route.delete("/delete/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var comment;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, typeorm_1.getRepository(Comment_1.Comment).delete(req.params.id)];
                case 1:
                    comment = _a.sent();
                    if (comment) {
                        return [2 /*return*/, res.json("deleted")];
                    }
                    else {
                        return [2 /*return*/, res.status(400).json("can't find")];
                    }
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=comment.js.map