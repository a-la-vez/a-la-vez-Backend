"use strict";
// import {Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from "typeorm";
// import { Post } from './Post'
// import { User } from './User'
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
// @Entity()
// export class Comment extends BaseEntity{
//     @PrimaryGeneratedColumn()
//     Id: number;
//     @Column()
//     Content: string;
//     @ManyToOne(
//         () => User,
//         (user) => user.Id
//     )
//     @JoinColumn({ name: 'user_id'})
//     userId: User;
//     @ManyToOne(
//         () => Post,
//         (post) => post.Id
//     )
//     @JoinColumn({ name: 'post_id'})
//     PostId: Post;
//     @CreateDateColumn()
//     createdAt: Date;
//     @UpdateDateColumn()
//     updatedAt: Date;
//     static findById(id: number){
//         return this.createQueryBuilder("comment")
//             .where("comment.id = :id", {id})
//             .getMany();
//     }
//     static findByPostID(id: number){
//         return this.createQueryBuilder("comment")
//             .where("comment.PostId = :id", {id})
//             .getMany();
//     }
// } 
var typeorm_1 = __importDefault(require("typeorm"));
var Post_1 = require("./Post");
var User_1 = require("./User");
var Comment = /** @class */ (function (_super) {
    __extends(Comment, _super);
    function Comment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Comment.findById = function (id) {
        return this.createQueryBuilder("comment")
            .where("comment.id = :id", { id: id })
            .getMany();
    };
    Comment.findByPostID = function (id) {
        return this.createQueryBuilder("comment")
            .where("comment.PostId = :id", { id: id })
            .getMany();
    };
    __decorate([
        typeorm_1.default.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Comment.prototype, "Id", void 0);
    __decorate([
        typeorm_1.default.Column(),
        __metadata("design:type", String)
    ], Comment.prototype, "Content", void 0);
    __decorate([
        typeorm_1.default.ManyToOne(function () { return User_1.User; }, function (user) { return user.Id; }),
        typeorm_1.default.JoinColumn({ name: 'user_id' }),
        __metadata("design:type", User_1.User)
    ], Comment.prototype, "userId", void 0);
    __decorate([
        typeorm_1.default.ManyToOne(function () { return Post_1.Post; }, function (post) { return post.Id; }),
        typeorm_1.default.JoinColumn({ name: 'post_id' }),
        __metadata("design:type", Post_1.Post)
    ], Comment.prototype, "PostId", void 0);
    __decorate([
        typeorm_1.default.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Comment.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.default.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Comment.prototype, "updatedAt", void 0);
    Comment = __decorate([
        typeorm_1.default.Entity()
    ], Comment);
    return Comment;
}(typeorm_1.default.BaseEntity));
exports.Comment = Comment;
//# sourceMappingURL=Comment.js.map