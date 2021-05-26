import {Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import { Post } from './Post'
import { User } from './User'

@Entity()
export class Comment extends BaseEntity{

    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    Content: string;

    @ManyToOne(
        () => User,
        (user) => user.Id
    )
    @JoinColumn({ name: 'user_id'})
    userId: User;

    @ManyToOne(
        () => Post,
        (post) => post.Id
    )
    @JoinColumn({ name: 'post_id'})
    PostId: Post;

    @CreateDateColumn()
    createdAt: Date;


    @UpdateDateColumn()
    updatedAt: Date;

    static findById(id: number){
        return this.createQueryBuilder("comment")
            .where("comment.id = :id", {id})
            .getMany();
    }

    static findByPostID(id: number){
        return this.createQueryBuilder("comment")
            .where("comment.PostId = :id", {id})
            .getMany();
    }
} 