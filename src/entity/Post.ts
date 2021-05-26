import {Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import { User } from './User'

@Entity()
export class Post extends BaseEntity{

    @PrimaryGeneratedColumn()
    Id: number;

    @Column({
        nullable: true,
    })
    ImagePath: string;

    @Column()
    Title: string;

    @Column()
    Content: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(
        () => User,
        (user) => user.Id
    )
    @JoinColumn({
        name: 'user_id'
    })
    userId: User;

    @Column()
    Period: Date;

    //카테고리는 문자열로 하고 띄어쓰기나 쉼표로 구분해서 저장
    //카테고리로 분류할 때는 해당 단어가 들어갔는지로 구분해야 할 듯
    @Column({
        nullable: true,
    })
    Category: string;

    static findById(id: number){
        return this.createQueryBuilder("post")
            .where("post.Id = :id", {id})
            .getMany();
    }

    static findByCategory(category: string){
        return this.createQueryBuilder("post")
            .where("post.Category = :category", {category})
            .getMany();
    }
} 