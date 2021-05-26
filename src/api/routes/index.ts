import {Router, Request, Response, NextFunction} from "express";
import path = require("path")
const route = Router();

export default (app:Router)=>{
    app.use("/", route);

    route.get("/", (req: Request, res: Response)=>{
        res.sendFile(path.resolve('src/html/index.html'));
    })
} 