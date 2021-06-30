import {Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import { Post } from "./Post";
import { User } from './User'

@Entity()
export class Application extends BaseEntity{

    @PrimaryGeneratedColumn()
    Id!: number;

    @ManyToOne(
        () => User,
        (user) => user.Id
    )
    @JoinColumn({
        name: 'user_id'
    })
    userId!: User;
    
    @ManyToOne(
        () => Post,
        (post) => post.Id
    )
    @JoinColumn({
        name: 'post_id'
    })
    postId!: Post;

    // 신청자 리스트도 하나 뺴서 게시물 id, 유저 id 하면 될듯

    static findById(id: number){
        return this.createQueryBuilder("post")
            .where("post.Id = :id", {id})
            .getMany();
    }
} 