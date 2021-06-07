"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const methodOverride = require("method-override");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const email_1 = require("../../config/email");
const User_1 = require("../../entity/User");
const multer = require("multer");
const path_1 = require("path");
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, path_1.default.join(__dirname + '../../../public/PostsImages/'));
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}__${file.originalname}`);
    }
});
const uploadWithOriginFN = multer({ storage: storage });
const generateRandom = () => {
    var ranNum = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
    return ranNum;
};
const rancode = generateRandom();
const route = express_1.Router();
exports.default = (app) => {
    app.use(methodOverride("_method"));
    app.use('/auth', route);
    route.post("/join", uploadWithOriginFN.single('file'), async (req, res) => {
        const { nick, email, password, re_password } = req.body;
        const hash = await bcrypt_1.default.hash(password, 12);
        if (password != re_password) {
            return res.status(400).json("password and re_password are diffirent");
        }
        const dbUser = await User_1.User.findByEmail(email);
        if (dbUser) {
            return res.status(400).json("This email is already registered.");
        }
        const user = {
            email,
            nick,
            password: hash,
            imagePath: `/public/Profiles/${req.file.filename}`
        };
        if (typeof email == 'string') {
            const mailOptions = {
                from: "TEST.site",
                to: email,
                subject: "이메일 인증번호",
                text: `이메일 인증번호: ${rancode}`
            };
            email_1.default.sendMail(mailOptions, (error, responses) => {
                console.log("if");
                if (error) {
                    console.log('error');
                    res.json({ msg: error });
                }
                else {
                    console.log('redirect');
                    res.json({ "user": user });
                }
                email_1.default.close();
            });
        }
    });
    route.post('/code', async (req, res) => {
        const { code, user } = req.body;
        if (code == rancode) {
            const newUser = new User_1.User();
            newUser.Nick = user.nick;
            newUser.Email = user.email;
            newUser.Password = user.password;
            newUser.ImagePath = user.imagePath;
            await newUser.save();
            return res.json("Ok");
        }
        else {
            return res.status(400).json("diffirent code");
        }
    });
    route.post("/login", async (req, res) => {
        const { email, password } = req.body;
        const dbUser = await User_1.User.findByEmail(email);
        if (dbUser && typeof process.env.TOKEN_SECRET == 'string') {
            if (await bcrypt_1.default.compare(password, dbUser.Password)) {
                const user = {
                    id: dbUser.Id,
                    nick: dbUser.Nick,
                    email: dbUser.Email
                };
                const token = jsonwebtoken_1.default.sign(user, process.env.TOKEN_SECRET, { issuer: 'admin' });
                res.json(token);
            }
        }
        else {
            res.status(400).json("not found");
        }
    });
    route.post("/test", uploadWithOriginFN.single('file'), (req, res) => {
        const { name, nick, email, password, re_password } = req.body;
        const user = {
            name,
            nick,
            email,
            password,
            url: `/public/Profiles/${req.file.filename}`
        };
        console.log(req.file.filename);
        res.json(user);
    });
    route.get("/user/:id", async (req, res) => {
        const id = Number(req.params.id);
        const dbUser = await User_1.User.findById(id);
        if (dbUser) {
            return res.json(dbUser);
        }
        else {
            return res.status(400).json("can't find");
        }
    });
    route.get("/userAndrelation/:id", async (req, res) => {
        const id = Number(req.params.id);
        const dbUser = await User_1.User.findRelationById(id);
        if (dbUser) {
            return res.json(dbUser);
        }
        else {
            return res.status(400).json("can't find");
        }
    });
};
//# sourceMappingURL=auth.js.map