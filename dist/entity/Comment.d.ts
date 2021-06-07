import { BaseEntity } from "typeorm";
import { Post } from './Post';
import { User } from './User';
export declare class Comment extends BaseEntity {
    Id: number;
    Content: string;
    userId: User;
    PostId: Post;
    createdAt: Date;
    updatedAt: Date;
    static findById(id: number): Promise<Comment[]>;
    static findByPostID(id: number): Promise<Comment[]>;
}
