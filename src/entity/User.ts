import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Post } from "./Post";

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    Nick: string;

    @Column()
    Email: string;

    @Column()
    Password: string;

    @Column({
        nullable: true,
    })
    ImagePath: string;

    @OneToMany(
        () => Post,
        (post)=>post.userId
    )
    post: Post[];
    
    static findById(id: number){
        return this.createQueryBuilder("user")
            .where("user.Id = :id", {id})
            .getOne();
    }

    static findByEmail(email: string){
        return this.createQueryBuilder("user")
            .where("user.Email = :email", {email})
            .getOne();
    }

    static findRelationById(id: number){
        return this.createQueryBuilder("user")
            .leftJoinAndSelect("user.post","post")
            .where('user.Id = :id', {id})
            .getMany();
            
    }
}