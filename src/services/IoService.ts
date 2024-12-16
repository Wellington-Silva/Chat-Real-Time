import { User } from '../entity/User';
import { Room } from '../entity/Room';
import { Message } from '../entity/Message';
import { AppDataSource } from '../../data-source';

export class IoService {

    private messageRepository = AppDataSource.getRepository(Message);
    private roomRepository = AppDataSource.getRepository(Room);
    private userRepository = AppDataSource.getRepository(User);

    async sendMessageToRoom(roomId: string, content: string, senderId: number) {

        const room = await this.roomRepository.findOne({ where: { id: roomId } });
        if (!room)
            throw new Error('Room not found');

        // Buscar o remetente
        const sender = await this.userRepository.findOne({ where: { id: senderId } });
        if (!sender)
            throw new Error('Sender not found');

        const message = this.messageRepository.create({ content, sender: { id: senderId }, room });
        await this.messageRepository.save(message);

        return message;
    };

    /**
     * Salva uma mensagem no banco de dados.
     * @param content Conteúdo da mensagem.
     * @param sender Usuário que enviou a mensagem.
     * @param recipient Usuário que recebeu a mensagem.
     * @returns A mensagem salva.
     */
    async saveMessage(content: string, sender: User, recipient: User) {
        const message = this.messageRepository.create({
            content,
            sender,
            recipient,
        });
        return await this.messageRepository.save(message);
    };

    /**
     * Recupera todas as mensagens trocadas entre dois usuários.
     * @param sender ID do primeiro usuário.
     * @param recipient ID do segundo usuário.
     * @returns Lista de mensagens ordenadas pela data de criação.
     */
    async getMessagesBetweenUsers(sender: number, recipient: number) {
        return await this.messageRepository.find({
            where: [
                { sender: { id: sender }, recipient: { id: recipient } },
                { sender: { id: recipient }, recipient: { id: sender } },
            ],
            relations: ['sender', 'recipient'],
            order: { createdAt: 'ASC' }, // Garante a ordenação correta
        });
    };

    /**
     * Recupera todas as mensagens trocadas entre membros de uma sala.
     * @param roomId ID da Sala.
     * @returns Lista de mensagens ordenadas pela data de criação.
     */
    async getMessagesBetweenMembers(roomId: string) {
        const room = await this.roomRepository.findOne({ where: { id: roomId } });

        if (!room) throw new Error('Sala não encontrada');

        return await this.messageRepository.find({
            where: { room: { id: roomId } },
            relations: ['sender', 'room'], // Inclui remetente e sala nas respostas
            order: { createdAt: 'ASC' },   // Ordena por data de criação
        });
    };
}

// export default new IoService();