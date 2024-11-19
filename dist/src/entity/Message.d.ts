import { User } from './User';
export declare class Message {
    id: number;
    content: string;
    sender: User;
    recipient: User;
    senderId: number;
    recipientId: number;
    roomId: string;
    createdAt: Date;
}
