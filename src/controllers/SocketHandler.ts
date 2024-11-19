import { Server } from "socket.io";
import { User } from '../entity/User';
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
            } catch (error) {
                console.error(`Error sending message to room: ${error}`);
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