"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Post_1 = require("./Post");
let User = class User extends typeorm_1.BaseEntity {
    static findById(id) {
        return this.createQueryBuilder("user")
            .where("user.Id = :id", { id })
            .getOne();
    }
    static findByEmail(email) {
        return this.createQueryBuilder("user")
            .where("user.Email = :email", { email })
            .getOne();
    }
    static findRelationById(id) {
        return this.createQueryBuilder("user")
            .leftJoinAndSelect("user.post", "post")
            .where('user.Id = :id', { id })
            .getMany();
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "Id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "Nick", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "Email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "Password", void 0);
__decorate([
    typeorm_1.Column({
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "ImagePath", void 0);
__decorate([
    typeorm_1.OneToMany(() => Post_1.Post, (post) => post.userId),
    __metadata("design:type", Array)
], User.prototype, "post", void 0);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map