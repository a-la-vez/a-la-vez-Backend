import { BaseEntity } from "typeorm";
import { User } from './User';
export declare class Post extends BaseEntity {
    Id: number;
    ImagePath: string;
    Title: string;
    Content: string;
    createdAt: Date;
    updatedAt: Date;
    userId: User;
    Period: Date;
    Category: string;
    static findById(id: number): Promise<Post[]>;
    static findByCategory(category: string): Promise<Post[]>;
}
