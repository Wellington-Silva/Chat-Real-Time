import { User } from '../entity/User';
import { Message } from '../entity/Message';
export declare class IoService {
    private messageRepository;
    /**
     * Salva uma mensagem no banco de dados.
     * @param content Conteúdo da mensagem.
     * @param sender Usuário que enviou a mensagem.
     * @param recipient Usuário que recebeu a mensagem.
     * @returns A mensagem salva.
     */
    saveMessage(content: string, sender: User, recipient: User): Promise<Message>;
    /**
     * Recupera todas as mensagens trocadas entre dois usuários.
     * @param user1Id ID do primeiro usuário.
     * @param user2Id ID do segundo usuário.
     * @returns Lista de mensagens ordenadas pela data de criação.
     */
    getMessagesBetweenUsers(user1Id: number, user2Id: number): Promise<Message[]>;
}
