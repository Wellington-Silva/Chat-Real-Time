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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const http_1 = __importDefault(require("http"));
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const User_1 = require("./src/entity/User");
const data_source_1 = require("./data-source");
const UserRouter_1 = __importDefault(require("./src/routes/UserRouter"));
const ChatRouter_1 = __importDefault(require("./src/routes/ChatRouter"));
const StatusRouter_1 = __importDefault(require("./src/routes/StatusRouter"));
const SocketHandler_1 = __importDefault(require("./src/controllers/SocketHandler"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
io.on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
    SocketHandler_1.default.socketHandler(socket);
    const userId = socket.handshake.query.userId;
    if (userId) {
        // Definindo o usuário como online
        yield data_source_1.AppDataSource.getRepository(User_1.User).update(userId, { isOnline: true });
        console.log(`Usuário ${userId} está online`);
        // Quando o usuário se desconecta, atualizar status para offline
        socket.on('disconnect', () => __awaiter(void 0, void 0, void 0, function* () {
            yield data_source_1.AppDataSource.getRepository(User_1.User).update(userId, { isOnline: false });
            console.log(`Usuário ${userId} está offline`);
        }));
    }
}));
data_source_1.AppDataSource.initialize()
    .then(() => {
    // Routes
    app.use("/chat", ChatRouter_1.default);
    app.use("/users", UserRouter_1.default);
    app.use("/status", StatusRouter_1.default);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
})
    .catch((error) => console.error("Erro ao conectar ao banco de dados:", error));
//# sourceMappingURL=server.js.map