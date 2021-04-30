"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '.env') });
var app = express_1.default();
app.set('port', process.env.PORT || 3000);
app.set('views', path_1.default.join(__dirname, 'views'));
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.listen(app.get('port'), function () {
    console.log("server running on port " + app.get('port'));
});
//# sourceMappingURL=app.js.map