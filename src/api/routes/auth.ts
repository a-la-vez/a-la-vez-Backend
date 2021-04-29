import {Router, Request, Response, NextFunction} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Transport from "../../config/email";
import { User } from "../../entity/User";
import { IUser } from "../../interfaces/IUser";
const generateRandom = () => {
    var ranNum = Math.floor(Math.random()*(999999-111111+1)) + 111111;
    return ranNum;
}
const rancode = generateRandom();

const route = Router();

export default (app: Router) => {
    app.use('/auth', route);

    // route.post("/authLogin", (req:Request, res:Response)=>{
    //     res.redirect("https://developer.dsmkr.com/external/login?redirect_url=http://localhost:3000&client_id=67e237be362c4885beb1d4429af365d1")
    // })

    route.post("/join", async (req:Request, res:Response)=>{
        const {name, nick, email, password, re_password} = req.body;
        const hash = await bcrypt.hash(password, 12);

        if(password != re_password){
            return res.json("password and re_password are diffirent");
        }

        const dbUser = await User.findByEmail(email);

        if(dbUser){
            return res.json("This email is already registered.");
        }

        const user:IUser = {
            name,
            email,
            nick,
            password: hash,
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

    route.post('/code', async (req:Request, res:Response)=>{
        const { code, user } = req.body;

        if(code == rancode){
            const newUser = new User();
            newUser.Name = user.name;
            newUser.Nick = user.nick;
            newUser.Email = user.email;
            newUser.Password = user.password;
            await newUser.save();
            return res.json("Ok");
        }
        else{
            return res.json("diffirent code");
        }
    });

    route.post("/login", async (req:Request, res:Response)=>{
        const { email, password } = req.body;

        const dbUser = await User.findByEmail(email);
        if (dbUser && typeof process.env.TOKEN_SECRET == 'string') {
            if(await bcrypt.compare(password, dbUser.Password)){
                const user = {
                    id:dbUser.Id,
                    name:dbUser.Name,
                    nick:dbUser.Nick,
                    email: dbUser.Email
                }
                const token = jwt.sign(user, process.env.TOKEN_SECRET ,{expiresIn: '10m', issuer: 'admin'})
                res.json(token);
            }
        }
        else{
            res.json("not found");
        }
    })

    route.post("/test", (req:Request, res:Response)=>{
        const {user} = req.body;

        res.json(user);
    })

    route.post("/:id", ()=>{
        
    })
}