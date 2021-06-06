import {Router, Request, Response, NextFunction} from "express";
import methodOverride = require("method-override");
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Transport from "../../config/email";
import { User } from "../../entity/User";
import { IUser } from "../../interfaces/IUser";
import multer = require("multer")
import path from "path";

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, path.join(__dirname + '../../../public/PostsImages/'));
    },
    filename(req,file,cb){
        cb(null, `${Date.now()}__${file.originalname}`);
    }
})
const uploadWithOriginFN = multer({storage: storage});
const generateRandom = () => {
    var ranNum = Math.floor(Math.random()*(999999-111111+1)) + 111111;
    return ranNum;
}
const rancode = generateRandom();

const route = Router();

export default (app: Router) => {
    app.use(methodOverride("_method"));
    app.use('/auth', route);

    // route.post("/authLogin", (req:Request, res:Response)=>{
    //     res.redirect("https://developer.dsmkr.com/external/login?redirect_url=http://localhost:3000&client_id=67e237be362c4885beb1d4429af365d1")
    // })
    
    //테스트 해봄
    route.post("/join", uploadWithOriginFN.single('file'), async (req:Request, res:Response)=>{
        const {nick, email, password, re_password} = req.body;
        const hash = await bcrypt.hash(password, 12);

        if(password != re_password){
            return res.status(400).json("password and re_password are diffirent");
        }

        const dbUser = await User.findByEmail(email);

        if(dbUser){
            return res.status(400).json("This email is already registered.");
        }

        const user:IUser = {
            email,
            nick,
            password: hash,
            imagePath: `/public/Profiles/${req.file.filename}`
        };
        
        if(typeof email == 'string'){
            const mailOptions = {
                from: "TEST.site",
                to: email,
                subject: "이메일 인증번호",
                text: `이메일 인증번호: ${rancode}`
            };

            Transport.sendMail(mailOptions, (error, responses) =>{
                console.log("if");
                if(error){
                    console.log('error')
                    res.json({msg:error});
                }else{
                    console.log('redirect')
                    res.json({"user":user});
                }
                Transport.close();
            });
        }
    });
    //테스트 해봄
    route.post('/code', async (req:Request, res:Response)=>{
        const { code, user } = req.body;

        if(code == rancode){
            const newUser = new User();
            newUser.Nick = user.nick;
            newUser.Email = user.email;
            newUser.Password = user.password;
            newUser.ImagePath = user.imagePath
            await newUser.save();
            return res.json("Ok");
        }
        else{
            return res.status(400).json("diffirent code");
        }
    });
    //테스트 해봄
    route.post("/login", async (req:Request, res:Response)=>{
        const { email, password } = req.body;

        const dbUser = await User.findByEmail(email);
        if (dbUser && typeof process.env.TOKEN_SECRET == 'string') {
            if(await bcrypt.compare(password, dbUser.Password)){
                const user = {
                    id:dbUser.Id,
                    nick:dbUser.Nick,
                    email: dbUser.Email
                }
                // const token = jwt.sign(user, process.env.TOKEN_SECRET ,{expiresIn: '10m', issuer: 'admin'})
                const token = jwt.sign(user, process.env.TOKEN_SECRET ,{issuer: 'admin'})
                res.json(token);
            }
        }
        else{
            res.status(400).json("not found");
        }
    })

    route.post("/test", uploadWithOriginFN.single('file'), (req:Request, res:Response)=>{
        const {name, nick, email, password, re_password} = req.body;
        // const image = fs.readFileSync(path.join(__dirname + '../../../public/Profiles/'+req.file.filename))
        // const test = new Buffer(image).toString('base64');//base64 문자열로 변환
        const user = {
            name,
            nick,
            email,
            password,
            url: `/public/Profiles/${req.file.filename}`
        }
        console.log(req.file.filename);
        res.json(user);
    });

    route.get("/user/:id", async(req:Request, res:Response)=>{
        const id = Number(req.params.id)
        const dbUser = await User.findById(id);
        if(dbUser){
            return res.json(dbUser);
        }
        else{
            return res.status(400).json("can't find");
        }
    })

    route.get("/userAndrelation/:id", async (req:Request, res:Response)=>{
        const id = Number(req.params.id)
        const dbUser = await User.findRelationById(id);
        if(dbUser){
            return res.json(dbUser);
        }
        else{
            return res.status(400).json("can't find");
        }
    })
}