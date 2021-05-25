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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var method_override_1 = __importDefault(require("method-override"));
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var jsonwebtoken_1 = require("jsonwebtoken");
var typeorm_1 = require("typeorm");
var Post_1 = require("../../entity/Post");
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(__dirname + '../../../public/Profiles/'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "__" + file.originalname);
    }
});
var uploadWithOriginFN = multer_1.default({ storage: storage });
var route = express_1.Router();
exports.default = (function (app) {
    app.use(method_override_1.default("_method"));
    app.use("/post", route);
    //테스트 함
    //공고글 다 가져오기
    route.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var posts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, typeorm_1.getRepository(Post_1.Post).find()];
                case 1:
                    posts = _a.sent();
                    return [2 /*return*/, res.json(posts)];
            }
        });
    }); });
    //공고글 쓰기
    route.post("/write", uploadWithOriginFN.single('file'), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user, _a, title, content, day, year, month, date, post, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    user = "";
                    if (req.headers.authorization && process.env.TOKEN_SECRET) {
                        user = jsonwebtoken_1.verify(req.headers.authorization.substring(7), process.env.TOKEN_SECRET);
                    }
                    else {
                        return [2 /*return*/, res.status(400).json("No Token")];
                    }
                    _a = req.body, title = _a.title, content = _a.content;
                    day = new Date();
                    year = day.getFullYear();
                    month = day.getMonth() + 1;
                    date = day.getDate();
                    post = new Post_1.Post();
                    post.Title = title;
                    post.Content = content;
                    post.Period = new Date("2022-04-19");
                    post.ImagePath = "/public/PostsImages/" + req.file.filename;
                    post.userId = user.id;
                    post.createdAt = new Date(year + "-" + month + "-" + date);
                    post.updatedAt = new Date(year + "-" + month + "-" + date);
                    return [4 /*yield*/, post.save()];
                case 1:
                    _b.sent();
                    return [2 /*return*/, res.json("post save")];
                case 2:
                    e_1 = _b.sent();
                    console.error(e_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    //테스트 함
    //제목 수정
    route.patch("/update/title/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var title, day, year, month, date, post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    title = req.body.title;
                    day = new Date();
                    year = day.getFullYear();
                    month = day.getMonth() + 1;
                    date = day.getDate();
                    return [4 /*yield*/, typeorm_1.getRepository(Post_1.Post).findOne(req.params.id)];
                case 1:
                    post = _a.sent();
                    if (!post) return [3 /*break*/, 3];
                    post.Title = title;
                    post.updatedAt = new Date(year + "-" + month + "-" + date);
                    return [4 /*yield*/, post.save()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3: return [2 /*return*/, res.status(400).json("can't find")];
                case 4: return [4 /*yield*/, typeorm_1.getRepository(Post_1.Post).findOne(req.params.id)];
                case 5:
                    post = _a.sent();
                    return [2 /*return*/, res.json({ "updated": post })];
            }
        });
    }); });
    //테스트 함
    //기간 수정
    route.patch("/update/period/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var period, day, year, month, date, post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    period = req.body.period;
                    day = new Date();
                    year = day.getFullYear();
                    month = day.getMonth() + 1;
                    date = day.getDate();
                    return [4 /*yield*/, typeorm_1.getRepository(Post_1.Post).findOne(req.params.id)];
                case 1:
                    post = _a.sent();
                    if (!post) return [3 /*break*/, 3];
                    post.Period = new Date(period);
                    post.updatedAt = new Date(year + "-" + month + "-" + date);
                    return [4 /*yield*/, post.save()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3: return [2 /*return*/, res.status(400).json("can't find")];
                case 4: return [4 /*yield*/, typeorm_1.getRepository(Post_1.Post).findOne(req.params.id)];
                case 5:
                    post = _a.sent();
                    return [2 /*return*/, res.json({ "updated": post })];
            }
        });
    }); });
    //테스트 함
    //내용 수정
    route.patch("/update/content/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var content, day, year, month, date, post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    content = req.body.content;
                    day = new Date();
                    year = day.getFullYear();
                    month = day.getMonth() + 1;
                    date = day.getDate();
                    return [4 /*yield*/, typeorm_1.getRepository(Post_1.Post).findOne(req.params.id)];
                case 1:
                    post = _a.sent();
                    if (!post) return [3 /*break*/, 3];
                    post.Content = content;
                    post.updatedAt = new Date(year + "-" + month + "-" + date);
                    return [4 /*yield*/, post.save()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3: return [2 /*return*/, res.status(400).json("can't find")];
                case 4: return [4 /*yield*/, typeorm_1.getRepository(Post_1.Post).findOne(req.params.id)];
                case 5:
                    post = _a.sent();
                    return [2 /*return*/, res.json({ "updated": post })];
            }
        });
    }); });
    //테스트 함
    //삭제
    route.delete("/delete/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, typeorm_1.getRepository(Post_1.Post).delete(req.params.id)];
                case 1:
                    post = _a.sent();
                    if (post) {
                        return [2 /*return*/, res.json("deleted")];
                    }
                    return [2 /*return*/, res.status(400).json("can't find")];
            }
        });
    }); });
    //테스트 함
    //공고글 한 개 자세히 보기
    route.post("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, typeorm_1.getRepository(Post_1.Post).findOne(req.params.id)];
                case 1:
                    post = _a.sent();
                    if (post) {
                        return [2 /*return*/, res.json(post)];
                    }
                    return [2 /*return*/, res.status(400).json("can't find")];
            }
        });
    }); });
});
//# sourceMappingURL=post.js.map