import "dotenv/config";
import http from 'http';
import "reflect-metadata";
import express from "express";
import { Server } from 'socket.io';
import { User } from "./src/entity/User";
import { AppDataSource } from './data-source';
import UserRouter from "./src/routes/UserRouter";
import chatRouter from './src/routes/ChatRouter';
import statusRouter from './src/routes/StatusRouter';
import SocketHandler from "./src/controllers/SocketHandler";

const app = express();
app.use(express.json());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', async (socket) => {
    SocketHandler.socketHandler(socket);
    const userId = socket.handshake.query.userId;

    if (userId) {
        // Definindo o usuário como online
        await AppDataSource.getRepository(User).update(userId, { isOnline: true });
        console.log(`Usuário ${userId} está online`);

        // Quando o usuário se desconecta, atualizar status para offline
        socket.on('disconnect', async () => {
            await AppDataSource.getRepository(User).update(userId, { isOnline: false });
            console.log(`Usuário ${userId} está offline`);
        });
    }
});

AppDataSource.initialize()
    .then(() => {

        // Routes
        app.use("/chat", chatRouter);
        app.use("/users", UserRouter);
        app.use("/status", statusRouter);

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
    })
    .catch((error) => console.error("Erro ao conectar ao banco de dados:", error));