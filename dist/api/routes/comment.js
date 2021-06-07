"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const methodOverride = require("method-override");
const jsonwebtoken_1 = require("jsonwebtoken");
const typeorm_1 = require("typeorm");
const Comment_1 = require("../../entity/Comment");
const Post_1 = require("../../entity/Post");
const route = express_1.Router();
exports.default = (app) => {
    app.use(methodOverride("_method"));
    app.use("/comment", route);
    route.get("/findAll/:id", async (req, res) => {
        const post = await Post_1.Post.findById(Number(req.params.id));
        const comments = await Comment_1.Comment.findByPostID(Number(req.params.id));
        if (comments && post) {
            return res.json({ "comments": comments });
        }
        else {
            return res.status(400).json("can't find post");
        }
    });
    route.post("/write", async (req, res) => {
        let user = "";
        if (req.headers.authorization && process.env.TOKEN_SECRET) {
            user = jsonwebtoken_1.verify(req.headers.authorization.substring(7), process.env.TOKEN_SECRET);
        }
        else {
            return res.status(400).json("No Token");
        }
        const { content, postId } = req.body;
        const day = new Date();
        const year = day.getFullYear();
        const month = day.getMonth() + 1;
        const date = day.getDate();
        const newComment = new Comment_1.Comment;
        newComment.Content = content;
        newComment.PostId = postId;
        newComment.userId = user.id;
        newComment.createdAt = new Date(`${year}-${month}-${date}`);
        newComment.updatedAt = new Date(`${year}-${month}-${date}`);
        await newComment.save();
        return res.json("commited");
    });
    route.put("/update/:id", async (req, res) => {
        const { content } = req.body;
        const day = new Date();
        const year = day.getFullYear();
        const month = day.getMonth() + 1;
        const date = day.getDate();
        let updateComment = await typeorm_1.getRepository(Comment_1.Comment).findOne(req.params.id);
        if (updateComment) {
            updateComment.Content = content;
            updateComment.updatedAt = new Date(`${year}-${month}-${date}`);
            await updateComment.save();
            return res.json("updated");
        }
        else {
            return res.json("can't find");
        }
    });
    route.delete("/delete/:id", async (req, res) => {
        const comment = await typeorm_1.getRepository(Comment_1.Comment).delete(req.params.id);
        if (comment) {
            return res.json("deleted");
        }
        else {
            return res.status(400).json("can't find");
        }
    });
};
//# sourceMappingURL=comment.js.map