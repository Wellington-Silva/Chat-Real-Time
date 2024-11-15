import { Message } from './Message';
export declare class User {
    id: number;
    name: string;
    picture: string;
    email: string;
    password: string;
    sentMessages: Message[];
    receivedMessages: Message[];
    isOnline: boolean;
}
