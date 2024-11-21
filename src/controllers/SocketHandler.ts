import { Server } from "socket.io";
import { User } from '../entity/User';
import { Room } from "../entity/Room";
import { IoService } from "../services/IoService";
import { AppDataSource } from '../../data-source';

class SocketHandler {

    async socketHandler(socket: any, io: Server) {
        const userId = socket.handshake.query.userId;

        if (!userId) return;

        socket.on('message', (msg: string) => {
            console.log('Mensagem recebida:', msg);
            socket.broadcast.emit('message', `Echo: ${msg}`);
        });

        // Atualiza o status para "online" e emite o evento de mudança de status
        AppDataSource.getRepository(User).update(userId, { isOnline: true });
        socket.broadcast.emit('userStatusChange', { userId, isOnline: true });

        // Evento para juntar-se a uma sala
        socket.on('join-room', (roomId: string) => {
            socket.join(roomId);
            console.log(`User ${socket.id} joined room ${roomId}`);
        });

        // Evento para enviar mensagem para a sala
        socket.on('send-room-message', async ({ roomId, content, senderId }: { roomId: string; content: string; senderId: number }) => {
            try {
                const ioServiceInstance = new IoService();
                const message = await ioServiceInstance.sendMessageToRoom(roomId, content, senderId);

                // Enviar a mensagem para todos na sala
                io.to(roomId).emit('room-message', {
                    roomId,
                    content: message.content,
                    senderId,
                    createdAt: message.createdAt
                });

                // Buscar membros da sala e notificar quem não está presente
                const room = await AppDataSource.getRepository(Room)
                    .createQueryBuilder('room')
                    .leftJoinAndSelect('room.members', 'user')
                    .where('room.id = :roomId', { roomId })
                    .getOne();

                if (room) {
                    console.log(`Emitindo evento 'new_group_message' para os membros da sala ${roomId}`);
                    room.members.forEach((user) => {
                        if (user.id !== senderId) {
                            console.log(`Notificação - Nova mensagem do usuário ${user.id} no grupo ${roomId}`);
                            io.to(user.id.toString()).emit('new_group_message', {
                                roomId,
                                content: message.content,
                                senderId,
                                createdAt: message.createdAt,
                            });
                        }
                    });
                };
            } catch (error) {
                console.error(`Error sending message to room: ${error}`);
                socket.emit('error', { message: error });
            }
        });

        socket.on('send-private-message', async ({ recipientId, content, senderId }: { recipientId: number; content: string; senderId: number }) => {
            try {
                const ioServiceInstance = new IoService();
                const sender = await AppDataSource.getRepository(User).findOneBy({ id: senderId });
                const recipient = await AppDataSource.getRepository(User).findOneBy({ id: recipientId });
        
                if (!sender || !recipient) {
                    return socket.emit('error', { message: 'Usuário não encontrado' });
                }
        
                const message = await ioServiceInstance.saveMessage(content, sender, recipient);
                console.log(`Notificação - Nova mensagem para o usuário ${recipientId} de ${senderId}`);
                
                // Notificar o destinatário diretamente
                console.log(`Emitindo evento 'new_private_message' para o usuário ${recipientId}`);
                io.to(recipientId.toString()).emit('new_private_message', {
                    content: message.content,
                    senderId,
                    createdAt: message.createdAt,
                });
            } catch (error) {
                console.error(`Error sending private message: ${error}`);
                socket.emit('error', { message: error });
            }
        });

        // Escuta a desconexão e atualiza para "offline" + emite o evento de mudança de status
        socket.on('disconnect', async () => {
            await AppDataSource.getRepository(User).update(userId, { isOnline: false });
            socket.broadcast.emit('userStatusChange', { userId, isOnline: false });
        });
    };

};

export default new SocketHandler;

/*
 * No frontend, os clientes podem escutar o evento userStatusChange para atualizar a interface em tempo real sempre que um usuário ficar online ou offline.
   Exemplo de como um cliente (frontend) poderia escutar esse evento:
   socket.on('userStatusChange', (data) => {
        console.log(`${data.userId} está agora ${data.isOnline ? 'online' : 'offline'}`);
        // Aqui você pode atualizar a interface do usuário conforme necessário
    });
*/