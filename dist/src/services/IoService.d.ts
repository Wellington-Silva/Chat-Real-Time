import { User } from '../entity/User';
import { Message } from '../entity/Message';
export declare class IoService {
    private messageRepository;
    saveMessage(content: string, sender: User, recipient: User): Promise<Message>;
    getMessagesBetweenUsers(user1Id: number, user2Id: number): Promise<Message[]>;
}
