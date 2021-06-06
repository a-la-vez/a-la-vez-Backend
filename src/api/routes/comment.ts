import {Router, Request, Response, NextFunction} from "express"
import methodOverride = require("method-override");
import { verify } from "jsonwebtoken";
import { getRepository } from "typeorm";
import { Comment } from "../../entity/Comment";
import { Post } from "../../entity/Post";

const route = Router();

export default (app:Router)=>{
    app.use(methodOverride("_method"));
    app.use("/comment", route);

    route.get("/findAll/:id", async (req:Request, res:Response)=>{
        const post = await Post.findById(Number(req.params.id));
        const comments = await Comment.findByPostID(Number(req.params.id));
        if(comments && post){
            return res.json({"comments":comments});
        }
        else{
            return res.status(400).json("can't find post");
        }
    })

    route.post("/write", async (req:Request, res:Response)=>{
        let user:any = "";
        if(req.headers.authorization && process.env.TOKEN_SECRET){
            user = verify(req.headers.authorization.substring(7,),process.env.TOKEN_SECRET);
        }
        else{
            return res.status(400).json("No Token");
        }
        const {content, postId} = req.body;
        const day = new Date();
        const year = day.getFullYear();
        const month = day.getMonth()+1;
        const date = day.getDate();
        const newComment = new Comment;

        newComment.Content = content;
        newComment.PostId = postId;
        newComment.userId = user.id
        newComment.createdAt = new Date(`${year}-${month}-${date}`);
        newComment.updatedAt = new Date(`${year}-${month}-${date}`);
        await newComment.save();
        return res.json("commited");
    });

    route.put("/update/:id", async (req:Request, res:Response)=>{
        const {content} = req.body;
        const day = new Date();
        const year = day.getFullYear();
        const month = day.getMonth()+1;
        const date = day.getDate();

        let updateComment:Comment|undefined = await getRepository(Comment).findOne(req.params.id);
        
        if(updateComment){
            updateComment.Content = content;
            updateComment.updatedAt = new Date(`${year}-${month}-${date}`);
            await updateComment.save();
            return res.json("updated");
        }
        else{
            return res.json("can't find");
        }
    });

    route.delete("/delete/:id", async (req:Request, res:Response)=>{
        const comment = await getRepository(Comment).delete(req.params.id);
        if(comment){
            return res.json("deleted");
        }
        else{
            return res.status(400).json("can't find");
        }
    });
} 