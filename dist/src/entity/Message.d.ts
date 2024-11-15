import { User } from './User';
export declare class Message {
    id: number;
    content: string;
    sender: User;
    recipient: User;
    createdAt: Date;
}
