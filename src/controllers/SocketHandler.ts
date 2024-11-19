import { User } from '../entity/User';
import { AppDataSource } from '../../data-source';

class SocketHandler {

    async socketHandler(socket: any) {
        const userId = socket.handshake.query.userId;

        if (!userId) return;

        socket.on('message', (msg: string) => {
            console.log('Mensagem recebida:', msg);
            socket.broadcast.emit('message', `Echo: ${msg}`);
        });

        // Atualiza o status para "online" e emite o evento de mudança de status
        AppDataSource.getRepository(User).update(userId, { isOnline: true });
        socket.broadcast.emit('userStatusChange', { userId, isOnline: true });

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