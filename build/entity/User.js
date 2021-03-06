"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var typeorm_1 = require("typeorm");
var Post_1 = require("./Post");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User.findById = function (id) {
        return this.createQueryBuilder("user")
            .where("user.Id = :id", { id: id })
            .getOne();
    };
    User.findByEmail = function (email) {
        return this.createQueryBuilder("user")
            .where("user.Email = :email", { email: email })
            .getOne();
    };
    User.findRelationById = function (id) {
        return this.createQueryBuilder("user")
            .leftJoinAndSelect("user.post", "post")
            .where('user.Id = :id', { id: id })
            .getMany();
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
        typeorm_1.OneToMany(function () { return Post_1.Post; }, function (post) { return post.userId; }),
        __metadata("design:type", Array)
    ], User.prototype, "post", void 0);
    User = __decorate([
        typeorm_1.Entity()
    ], User);
    return User;
}(typeorm_1.BaseEntity));
exports.User = User;
//# sourceMappingURL=User.js.map