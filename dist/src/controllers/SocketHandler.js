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
const data_source_1 = require("../../data-source");
class SocketHandler {
    socketHandler(socket) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = socket.handshake.query.userId;
            if (!userId)
                return;
            socket.on('message', (msg) => {
                console.log('Mensagem recebida:', msg);
                socket.emit('message', `Echo: ${msg}`);
            });
            // Atualiza o status para "online" e emite o evento de mudança de status
            data_source_1.AppDataSource.getRepository(User_1.User).update(userId, { isOnline: true });
            socket.broadcast.emit('userStatusChange', { userId, isOnline: true });
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