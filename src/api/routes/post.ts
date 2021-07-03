import {Router, Request, Response, NextFunction} from "express";
import methodOverride = require("method-override");
import multer = require("multer");
import path from "path";
import {verify} from "jsonwebtoken";
import { getRepository } from "typeorm";
import { Post } from "../../entity/Post";
import { Heart } from "src/entity/Heart";
import { Application } from "src/entity/Application";

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
            const {title, content, personnel} = req.body;
            // const day = new Date();
            // const year = day.getFullYear();
            // const month = day.getMonth()+1;
            // const date = day.getDate();

            const post = new Post();
            post.Title = title;
            post.Content = content;
            post.Period = new Date("2022-04-19");
            post.Personnel = personnel;
            // post.ImagePath = `/public/PostsImages/${req.file.filename}`
            post.userId = user.id;
            // post.createdAt = new Date(`${year}-${month}-${date}`);
            // post.updatedAt = new Date(`${year}-${month}-${date}`);
            await post.save();
            return res.json("post save");
        }catch(e){
            console.error(e);
        }
    });
    
    //제목 수정
    route.patch("/update/title/:id", async (req:Request, res:Response)=>{
        const { title } = req.body;
        // const day = new Date();
        // const year = day.getFullYear();
        // const month = day.getMonth()+1;
        // const date = day.getDate();

        let post: Post|undefined = await getRepository(Post).findOne(req.params.id);
        if(post){
            post.Title = title;
            // post.updatedAt = new Date(`${year}-${month}-${date}`);
            await post.save();
        }
        else{
            return res.status(400).json("can't find");
        }
        post = await getRepository(Post).findOne(req.params.id);
        return res.json({"updated":post});
    });

    //기간 수정
    route.patch("/update/period/:id", async (req:Request, res:Response)=>{
        const { period } = req.body;
        // const day = new Date();
        // const year = day.getFullYear();
        // const month = day.getMonth()+1;
        // const date = day.getDate();

        let post: Post|undefined = await getRepository(Post).findOne(req.params.id);
        if(post){
            post.Period = new Date(period);
            // post.updatedAt = new Date(`${year}-${month}-${date}`);
            await post.save();
        }
        else{
            return res.status(400).json("can't find");
        }
        post = await getRepository(Post).findOne(req.params.id);
        return res.json({"updated":post});
    });

    //내용 수정
    route.patch("/update/content/:id", async (req:Request, res:Response)=>{
        const { content } = req.body;
        // const day = new Date();
        // const year = day.getFullYear();
        // const month = day.getMonth()+1;
        // const date = day.getDate();

        let post: Post|undefined = await getRepository(Post).findOne(req.params.id);
        if(post){
            post.Content = content;
            // post.updatedAt = new Date(`${year}-${month}-${date}`);
            await post.save();
        }
        else{
            return res.status(400).json("can't find");
        }
        post = await getRepository(Post).findOne(req.params.id);
        return res.json({"updated":post});
    });

    
    //삭제
    route.delete("/delete/:id", async (req:Request, res:Response)=>{
        const post = await getRepository(Post).delete(req.params.id);
        if(post){
            return res.json("deleted");
        }
        else{
            return res.status(400).json("can't find");
        }
    });

    
    //공고글 한 개 자세히 보기
    route.post("/:id", async (req:Request, res:Response)=>{
        const post = await getRepository(Post).findOne(req.params.id);
        if(post){
            return res.json(post);
        }
        else{
            return res.status(400).json("can't find");
        }
    });

    route.post("/heart/:id", async(req:Request, res:Response)=>{
        let user:any = "";
        const post = await getRepository(Post).findOne(req.params.id);
        if(req.headers.authorization && process.env.TOKEN_SECRET){
            user = verify(req.headers.authorization.substring(7,),process.env.TOKEN_SECRET);
        }
        else{
            return res.status(400).json("No Token");
        }
        
        const heart = new Heart()
        heart.userId = user.id;
        if(post != undefined){
            heart.postId = post;
        }
        else{
            res.status(200).json("wrong post id");
            return
        }
        await heart.save();
        res.json("Heart pressed");
    });

    route.delete("/heart/:id", async(req:Request, res:Response)=>{
        const heart = await getRepository(Heart).delete(req.params.id);
        if(heart){
            return res.json("Heart Deleted");
        }
        return res.status(400).json("can't find");
    });

    route.post("/application/:id/yes", async(req:Request, res:Response)=>{
        const application = await getRepository(Application).findOne(req.params.id);
        if(req.headers.authorization && process.env.TOKEN_SECRET){
            let user = verify(req.headers.authorization.substring(7,),process.env.TOKEN_SECRET);
        }
        else{
            return res.status(400).json("No Token");
        }

        if(application == undefined){
            return res.status(200).json("wrong application id");
        }
        application.accep_status = "yes";
        application.save();
    });

    route.post("/application/:id/no", async(req:Request, res:Response)=>{
        const application = await getRepository(Application).findOne(req.params.id);
        if(req.headers.authorization && process.env.TOKEN_SECRET){
            let user = verify(req.headers.authorization.substring(7,),process.env.TOKEN_SECRET);
        }
        else{
            return res.status(400).json("No Token");
        }

        if(application == undefined){
            return res.status(200).json("wrong application id");
        }
        application.accep_status = "no";
        application.save();
    });

    route.post("/application/:id", async(req:Request, res:Response)=>{
        let user:any = "";
        const post = await getRepository(Post).findOne(req.params.id);
        if(req.headers.authorization && process.env.TOKEN_SECRET){
            user = verify(req.headers.authorization.substring(7,),process.env.TOKEN_SECRET);
        }
        else{
            return res.status(400).json("No Token");
        }
        const {name, phone_number, sentence} = req.body;
        
        const application = new Application()
        application.userId = user.id;
        if(post != undefined){
            application.postId = post;
        }
        else{
            res.status(200).json("wrong post id");
            return
        }
        application.name = name;
        application.phone_number = phone_number;
        application.sentence = sentence;
        await application.save();
        res.json("Applications Received");
    });

    route.delete("/application/:id", async(req:Request, res:Response)=>{
        const application = await getRepository(Application).delete(req.params.id);
        if(application){
            return res.json("Application Cancelled");
        }
        else{
            return res.status(400).json("can't find");
        }
    });

    route.get("/getApplicationList/:id", async(req:Request, res:Response)=>{
        const applications = await getRepository(Application).find({
            where:{
                postId: req.params.id
            }
        })

        if(applications){
            return res.json(applications);
        }
        return res.status(400).json("can't find");
    })
}