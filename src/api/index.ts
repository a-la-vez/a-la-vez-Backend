import { Router } from "express"
import auth from "./routes/auth"
import post from "./routes/post"
import index from "./routes/index"

export default ()=>{
    const app = Router();

    auth(app);
    post(app);
    index(app)

    return app;
}