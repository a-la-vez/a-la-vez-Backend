import {Router, Request, Response, NextFunction} from "express";
import methodOverride from "method-override";
import { getRepository } from "typeorm";
import { Post } from "../../entity/Post";

const route = Router();

export default (app: Router) => {
    app.use(methodOverride("_method"));
    app.use("/post", route);

    route.post("/", async (req:Request, res:Response)=>{
        const posts = await getRepository(Post).find();
        res.send(posts);
    })

    route.post("/write", async (req:Request, res:Response)=>{
        const {title, content} = req.body;
        const day = new Date();
        const year = day.getFullYear();
        const month = day.getMonth()+1;
        const date = day.getDate();

        const post = new Post();
        post.Title = title;
        post.Content = content;
        post.Period = new Date("2022-04-19");
        post.createdAt = new Date(`${year}-${month}-${date}`);
        post.updatedAt = new Date(`${year}-${month}-${date}`);
        await post.save();
        res.send("done?")
    })
    //title만 업데이트 content만 업데이트 둘다 업데이트로 분할?
    //경로 다르게 해서?
    route.put("/update/:id", async (req:Request, res:Response)=>{
        const { title, content } = req.body;
        let post: Post|undefined = await getRepository(Post).findOne(req.params.id);
        if(post){
            post.Title = title;
            post.Content = content;
            await post.save();
        }
        post = await getRepository(Post).findOne(req.params.id);
        res.send(post);
    })

    route.delete("/delete/:id", async (req:Request, res:Response)=>{
        const post = await getRepository(Post).delete(req.params.id);
        res.send(post);
    })
}