"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entity/User");
const Message_1 = require("../entity/Message");
const data_source_1 = require("../../data-source");
class SocketHandler {
    socketHandler(socket, io) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = socket.handshake.query.userId;
            if (!userId)
                return;
            socket.on('message', (msg) => {
                console.log('Mensagem recebida:', msg);
                socket.broadcast.emit('message', `Echo: ${msg}`);
            });
            // Atualiza o status para "online" e emite o evento de mudança de status
            data_source_1.AppDataSource.getRepository(User_1.User).update(userId, { isOnline: true });
            socket.broadcast.emit('userStatusChange', { userId, isOnline: true });
            // Entrar em uma sala
            socket.on('joinRoom', (roomId) => {
                socket.join(roomId);
                console.log(`Usuário ${userId} entrou na sala ${roomId}`);
            });
            // Sair de uma sala
            socket.on('leaveRoom', (roomId) => {
                socket.leave(roomId);
                console.log(`Usuário ${userId} saiu da sala ${roomId}`);
            });
            // Enviar mensagem para a sala
            socket.on('roomMessage', (_a) => __awaiter(this, [_a], void 0, function* ({ roomId, content }) {
                const message = yield data_source_1.AppDataSource.getRepository(Message_1.Message).save({
                    content,
                    sender: { id: userId },
                    roomId,
                });
                io.to(roomId).emit('roomMessage', message);
            }));
            // Escuta a desconexão e atualiza para "offline" + emite o evento de mudança de status
            socket.on('disconnect', () => __awaiter(this, void 0, void 0, function* () {
                yield data_source_1.AppDataSource.getRepository(User_1.User).update(userId, { isOnline: false });
                socket.broadcast.emit('userStatusChange', { userId, isOnline: false });
            }));
        });
    }
    ;
}
;
exports.default = new SocketHandler;
/*
 * No frontend, os clientes podem escutar o evento userStatusChange para atualizar a interface em tempo real sempre que um usuário ficar online ou offline.
   Exemplo de como um cliente (frontend) poderia escutar esse evento:
   socket.on('userStatusChange', (data) => {
        console.log(`${data.userId} está agora ${data.isOnline ? 'online' : 'offline'}`);
        // Aqui você pode atualizar a interface do usuário conforme necessário
    });
*/ 
//# sourceMappingURL=SocketHandler.js.map