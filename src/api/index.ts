import { Router } from "express"
import auth from "./routes/auth"
import post from "./routes/post"
import index from "./routes/index"
import comment from "./routes/comment"

export default ()=>{
    const app = Router();

    auth(app);
    post(app);
    index(app);
    comment(app);

    return app;
}