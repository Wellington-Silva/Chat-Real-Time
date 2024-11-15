import { User } from '../entity/User';
import { Message } from '../entity/Message';
import { AppDataSource } from '../../data-source';

export class IoService {
    private messageRepository = AppDataSource.getRepository(Message);

    async saveMessage(content: string, sender: User, recipient: User) {
        const message = this.messageRepository.create({
            content,
            sender,
            recipient,
        });
        await this.messageRepository.save(message);
        return message;
    };

    async getMessagesBetweenUsers(user1Id: number, user2Id: number) {
        return this.messageRepository.find({
            where: [
                { sender: { id: user1Id }, recipient: { id: user2Id } },
                { sender: { id: user2Id }, recipient: { id: user1Id } },
            ],
            relations: ['sender', 'recipient'],
            order: { createdAt: 'ASC' },
        });
    };
};
