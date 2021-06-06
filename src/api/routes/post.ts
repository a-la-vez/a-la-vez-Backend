import {Router, Request, Response, NextFunction} from "express";
import methodOverride = require("method-override");
import multer = require("multer");
import path from "path";
import {verify} from "jsonwebtoken";
import { getRepository } from "typeorm";
import { Post } from "../../entity/Post";

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, path.join(__dirname + '../../../public/Profiles/'));
    },
    filename(req,file,cb){
        cb(null, `${Date.now()}__${file.originalname}`);
    }
})
const uploadWithOriginFN = multer({storage: storage});

const route = Router();

export default (app: Router) => {
    app.use(methodOverride("_method"));
    app.use("/post", route);

    //테스트 함
    //공고글 다 가져오기
    route.post("/", async (req:Request, res:Response)=>{
        const posts = await getRepository(Post).find();
        return res.json(posts);
    });

    //공고글 쓰기
    route.post("/write", async (req:Request, res:Response)=>{
        try{
            let user:any = "";
            if(req.headers.authorization && process.env.TOKEN_SECRET){
                user = verify(req.headers.authorization.substring(7,),process.env.TOKEN_SECRET);
            }
            else{
                return res.status(400).json("No Token");
            }
            const {title, content} = req.body;
            const day = new Date();
            const year = day.getFullYear();
            const month = day.getMonth()+1;
            const date = day.getDate();

            const post = new Post();
            post.Title = title;
            post.Content = content;
            post.Period = new Date("2022-04-19");
            // post.ImagePath = `/public/PostsImages/${req.file.filename}`
            post.userId = user.id;
            post.createdAt = new Date(`${year}-${month}-${date}`);
            post.updatedAt = new Date(`${year}-${month}-${date}`);
            await post.save();
            return res.json("post save");
        }catch(e){
            console.error(e);
        }
    });
    
    //테스트 함
    //제목 수정
    route.patch("/update/title/:id", async (req:Request, res:Response)=>{
        const { title } = req.body;
        const day = new Date();
        const year = day.getFullYear();
        const month = day.getMonth()+1;
        const date = day.getDate();

        let post: Post|undefined = await getRepository(Post).findOne(req.params.id);
        if(post){
            post.Title = title;
            post.updatedAt = new Date(`${year}-${month}-${date}`);
            await post.save();
        }
        else{
            return res.status(400).json("can't find");
        }
        post = await getRepository(Post).findOne(req.params.id);
        return res.json({"updated":post});
    });

    //테스트 함
    //기간 수정
    route.patch("/update/period/:id", async (req:Request, res:Response)=>{
        const { period } = req.body;
        const day = new Date();
        const year = day.getFullYear();
        const month = day.getMonth()+1;
        const date = day.getDate();

        let post: Post|undefined = await getRepository(Post).findOne(req.params.id);
        if(post){
            post.Period = new Date(period);
            post.updatedAt = new Date(`${year}-${month}-${date}`);
            await post.save();
        }
        else{
            return res.status(400).json("can't find");
        }
        post = await getRepository(Post).findOne(req.params.id);
        return res.json({"updated":post});
    });

    //테스트 함
    //내용 수정
    route.patch("/update/content/:id", async (req:Request, res:Response)=>{
        const { content } = req.body;
        const day = new Date();
        const year = day.getFullYear();
        const month = day.getMonth()+1;
        const date = day.getDate();

        let post: Post|undefined = await getRepository(Post).findOne(req.params.id);
        if(post){
            post.Content = content;
            post.updatedAt = new Date(`${year}-${month}-${date}`);
            await post.save();
        }
        else{
            return res.status(400).json("can't find");
        }
        post = await getRepository(Post).findOne(req.params.id);
        return res.json({"updated":post});
    });

    //테스트 함
    //삭제
    route.delete("/delete/:id", async (req:Request, res:Response)=>{
        const post = await getRepository(Post).delete(req.params.id);
        if(post){
            return res.json("deleted");
        }
        return res.status(400).json("can't find");
    });

    //테스트 함
    //공고글 한 개 자세히 보기
    route.post("/:id", async (req:Request, res:Response)=>{
        const post = await getRepository(Post).findOne(req.params.id);
        if(post){
            return res.json(post);
        }
        return res.status(400).json("can't find");
    });
} 