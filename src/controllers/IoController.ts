import { User } from '../entity/User';
import { Request, Response } from 'express';
import { IoService } from '../services/IoService';
import { AppDataSource } from '../../data-source';

const ioService = new IoService();

class IoController {
    
    // Função para enviar mensagem em conversa privada
    async sendMessage(req: Request, res: Response) {
        try {
            const { senderId, recipientId, content } = req.body;

            // Busca o remetente e o destinatário
            const sender = await AppDataSource.getRepository(User).findOneBy({ id: senderId });
            const recipient = await AppDataSource.getRepository(User).findOneBy({ id: recipientId });

            if (!sender || !recipient)
                return res.status(404).json({ message: 'Usuário não encontrado' });

            const message = await ioService.saveMessage(content, sender, recipient);

            res.status(201).json({ error: false, message });
        } catch (e) {
            return res.status(500).json({ error: true, message: 'Erro ao enviar a mensagem', e });
        }
    };

    // Função para obter o histórico de mensagens de uma conversa privada
    async getMessageHistory(req: Request, res: Response) {
        try {
            const { sender, recipient } = req.query;

            const messages = await ioService.getMessagesBetweenUsers(Number(sender), Number(recipient));

            res.status(200).json(messages);
        } catch (e) {
            return res.status(500).json({ error: true, message: 'Erro ao obter histórico de mensagens', e });
        }
    };
    
};

export default new IoController();