import "reflect-metadata";
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import dotenv from 'dotenv';
import { createConnection } from "typeorm";
dotenv.config({path: path.join(__dirname, '.env')});
import router from "./api";

const app: express.Application = express();

createConnection().then(async connection => {

    console.log("Hello");

}).catch(error => console.log(error));

app.set('port', process.env.PORT || 3000);
console.log(__dirname);
app.use('/public',express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.use('/', router());

app.listen(app.get('port'), ()=>{
    console.log(`server running on port ${app.get('port')}`);
})