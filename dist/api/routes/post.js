"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const methodOverride = require("method-override");
const multer = require("multer");
const path_1 = require("path");
const jsonwebtoken_1 = require("jsonwebtoken");
const typeorm_1 = require("typeorm");
const Post_1 = require("../../entity/Post");
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, path_1.default.join(__dirname + '../../../public/Profiles/'));
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}__${file.originalname}`);
    }
});
const uploadWithOriginFN = multer({ storage: storage });
const route = express_1.Router();
exports.default = (app) => {
    app.use(methodOverride("_method"));
    app.use("/post", route);
    route.post("/", async (req, res) => {
        const posts = await typeorm_1.getRepository(Post_1.Post).find();
        return res.json(posts);
    });
    route.post("/write", async (req, res) => {
        try {
            let user = "";
            if (req.headers.authorization && process.env.TOKEN_SECRET) {
                user = jsonwebtoken_1.verify(req.headers.authorization.substring(7), process.env.TOKEN_SECRET);
            }
            else {
                return res.status(400).json("No Token");
            }
            const { title, content } = req.body;
            const day = new Date();
            const year = day.getFullYear();
            const month = day.getMonth() + 1;
            const date = day.getDate();
            const post = new Post_1.Post();
            post.Title = title;
            post.Content = content;
            post.Period = new Date("2022-04-19");
            post.userId = user.id;
            post.createdAt = new Date(`${year}-${month}-${date}`);
            post.updatedAt = new Date(`${year}-${month}-${date}`);
            await post.save();
            return res.json("post save");
        }
        catch (e) {
            console.error(e);
        }
    });
    route.patch("/update/title/:id", async (req, res) => {
        const { title } = req.body;
        const day = new Date();
        const year = day.getFullYear();
        const month = day.getMonth() + 1;
        const date = day.getDate();
        let post = await typeorm_1.getRepository(Post_1.Post).findOne(req.params.id);
        if (post) {
            post.Title = title;
            post.updatedAt = new Date(`${year}-${month}-${date}`);
            await post.save();
        }
        else {
            return res.status(400).json("can't find");
        }
        post = await typeorm_1.getRepository(Post_1.Post).findOne(req.params.id);
        return res.json({ "updated": post });
    });
    route.patch("/update/period/:id", async (req, res) => {
        const { period } = req.body;
        const day = new Date();
        const year = day.getFullYear();
        const month = day.getMonth() + 1;
        const date = day.getDate();
        let post = await typeorm_1.getRepository(Post_1.Post).findOne(req.params.id);
        if (post) {
            post.Period = new Date(period);
            post.updatedAt = new Date(`${year}-${month}-${date}`);
            await post.save();
        }
        else {
            return res.status(400).json("can't find");
        }
        post = await typeorm_1.getRepository(Post_1.Post).findOne(req.params.id);
        return res.json({ "updated": post });
    });
    route.patch("/update/content/:id", async (req, res) => {
        const { content } = req.body;
        const day = new Date();
        const year = day.getFullYear();
        const month = day.getMonth() + 1;
        const date = day.getDate();
        let post = await typeorm_1.getRepository(Post_1.Post).findOne(req.params.id);
        if (post) {
            post.Content = content;
            post.updatedAt = new Date(`${year}-${month}-${date}`);
            await post.save();
        }
        else {
            return res.status(400).json("can't find");
        }
        post = await typeorm_1.getRepository(Post_1.Post).findOne(req.params.id);
        return res.json({ "updated": post });
    });
    route.delete("/delete/:id", async (req, res) => {
        const post = await typeorm_1.getRepository(Post_1.Post).delete(req.params.id);
        if (post) {
            return res.json("deleted");
        }
        return res.status(400).json("can't find");
    });
    route.post("/:id", async (req, res) => {
        const post = await typeorm_1.getRepository(Post_1.Post).findOne(req.params.id);
        if (post) {
            return res.json(post);
        }
        return res.status(400).json("can't find");
    });
};
//# sourceMappingURL=post.js.map