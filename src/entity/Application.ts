import {Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column} from "typeorm";
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

    //이름
    @Column()
    name!: string;

    //전화번호
    @Column()
    phone_number!: number;

    //각오 한 마디
    @Column()
    sentence!: string;

    //수락 여부
    @Column({
        default: "wait"
    })
    accep_status!: string;

    // 신청자 리스트도 하나 뺴서 게시물 id, 유저 id 하면 될듯

    static findById(id: number){
        return this.createQueryBuilder("post")
            .where("post.Id = :id", {id})
            .getMany();
    }
} 