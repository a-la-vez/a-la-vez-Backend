"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const typeorm_1 = require("typeorm");
const api_1 = require("./api");
require('dotenv').config();
const app = express();
typeorm_1.createConnection().then(async (connection) => {
    console.log("Hello");
}).catch(error => console.log(error));
app.set('port', process.env.PORT || 3000);
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', api_1.default());
app.listen(app.get('port'), () => {
    console.log(`server running on port ${app.get('port')}`);
});
//# sourceMappingURL=app.js.map