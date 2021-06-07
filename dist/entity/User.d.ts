import { BaseEntity } from "typeorm";
import { Post } from "./Post";
export declare class User extends BaseEntity {
    Id: number;
    Nick: string;
    Email: string;
    Password: string;
    ImagePath: string;
    post: Post[];
    static findById(id: number): Promise<User>;
    static findByEmail(email: string): Promise<User>;
    static findRelationById(id: number): Promise<User[]>;
}
