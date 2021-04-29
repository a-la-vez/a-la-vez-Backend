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