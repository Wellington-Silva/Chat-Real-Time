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
exports.IoService = void 0;
const Message_1 = require("../entity/Message");
const data_source_1 = require("../../data-source");
class IoService {
    constructor() {
        this.messageRepository = data_source_1.AppDataSource.getRepository(Message_1.Message);
    }
    /**
     * Salva uma mensagem no banco de dados.
     * @param content Conteúdo da mensagem.
     * @param sender Usuário que enviou a mensagem.
     * @param recipient Usuário que recebeu a mensagem.
     * @returns A mensagem salva.
     */
    saveMessage(content, sender, recipient) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = this.messageRepository.create({
                content,
                sender,
                recipient,
            });
            return yield this.messageRepository.save(message);
        });
    }
    /**
     * Recupera todas as mensagens trocadas entre dois usuários.
     * @param user1Id ID do primeiro usuário.
     * @param user2Id ID do segundo usuário.
     * @returns Lista de mensagens ordenadas pela data de criação.
     */
    getMessagesBetweenUsers(user1Id, user2Id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.messageRepository.find({
                where: [
                    { sender: { id: user1Id }, recipient: { id: user2Id } },
                    { sender: { id: user2Id }, recipient: { id: user1Id } },
                ],
                relations: ['sender', 'recipient'],
                order: { createdAt: 'ASC' }, // Garante a ordenação correta
            });
        });
    }
}
exports.IoService = IoService;
//# sourceMappingURL=IoService.js.map