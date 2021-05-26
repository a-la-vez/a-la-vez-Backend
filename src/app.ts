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


// createConnection().then(async connection => {
//     console.log("Hello");
// }).catch(error => {
//     console.log("have error");
//     getConnectionOptions("main").then(option=>{
//         const connect = new Connection(option)
//         connect.connect();
//         console.log(connect.isConnected);
//     })
//     if(error.code == 'PROTOCOL_CONNECTION_LOST'){
//         console.log("PROTOCOL_CONNECTION_LOST");
//     }else{
//         throw error;
//     }
// });



// process.on('unhandledRejection', listener => {
//     if (listener!.toString().match(/ECONNREFUSED/) ||
//         listener!.toString().match(/Connection is not established/)) {
//         logger(`Connection to ${bold(target_database.database)} has been lost. Retry to connect ...`, _PRIORITY.CRITICAL, null, _MODULE.MAIN);
//         conn?.close()
//         conn?.connect()
//     }

// })

app.set('port', process.env.PORT || 3000);
app.use('/public',express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.use('/', router());

app.listen(app.get('port'), ()=>{
    console.log(`server running on port ${app.get('port')}`);
}) 