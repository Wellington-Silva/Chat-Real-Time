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
const IoService_1 = require("../services/IoService");
const data_source_1 = require("../../data-source");
const ioService = new IoService_1.IoService();
class IoController {
    // Função para enviar mensagem
    sendMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { senderId, recipientId, content } = req.body;
                // Busca o remetente e o destinatário
                const sender = yield data_source_1.AppDataSource.getRepository(User_1.User).findOneBy({ id: senderId });
                const recipient = yield data_source_1.AppDataSource.getRepository(User_1.User).findOneBy({ id: recipientId });
                if (!sender || !recipient) {
                    return res.status(404).json({ message: 'Usuário não encontrado' });
                }
                // Salva a mensagem no banco de dados
                const message = yield ioService.saveMessage(content, sender, recipient);
                res.status(201).json({ error: false, message });
            }
            catch (e) {
                return res.status(500).json({ error: true, message: 'Erro ao enviar a mensagem', e });
            }
        });
    }
    ;
    // Função para obter o histórico de mensagens
    getMessageHistory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user1Id, user2Id } = req.query;
                // Chama o serviço para obter as mensagens
                const messages = yield ioService.getMessagesBetweenUsers(Number(user1Id), Number(user2Id));
                return res.status(200).json(messages);
            }
            catch (e) {
                return res.status(500).json({ error: true, message: 'Erro ao obter histórico de mensagens', e });
            }
        });
    }
    ;
}
;
exports.default = new IoController();
//# sourceMappingURL=IoController.js.map