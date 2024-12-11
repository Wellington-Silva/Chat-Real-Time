import "dotenv/config";
import http from 'http';
import path from 'path';
import cors from "cors";
import "reflect-metadata";
import express from "express";
import { Server } from 'socket.io';
import { User } from "./src/entity/User";
import { AppDataSource } from './data-source';
import UserRouter from "./src/routes/UserRouter";
import chatRouter from './src/routes/ChatRouter';
import roomRouter from "./src/routes/RoomRouter";
import statusRouter from './src/routes/StatusRouter';
import SocketHandler from "./src/controllers/SocketHandler";

const app = express();
app.use(express.json());
const server = http.createServer(app);

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/chat-client.html'));
});

io.on('connection', async (socket) => {
    console.log('Usuário conectado:', socket.id);
    
    SocketHandler.socketHandler(socket, io);
    const userId = socket.handshake.query.userId;

    if (userId) {
        // Definindo o usuário como online
        await AppDataSource.getRepository(User).update(userId, { isOnline: true });
        console.log(`Usuário ${userId} está online`);

        socket.on('register-user', (userId: string) => {
            socket.join(userId); // Entrar em uma sala exclusiva com o ID do usuário
            console.log(`Usuário ${userId} registrado no socket ${socket.id}`);
        });

        // Quando o usuário se desconecta, atualizar status para offline
        socket.on('disconnect', async () => {
            await AppDataSource.getRepository(User).update(userId, { isOnline: false });
            console.log(`Usuário ${userId} está offline`);
        });
    };
});

AppDataSource.initialize()
    .then(() => {

        // Routes
        app.use("/chat", chatRouter);
        app.use("/users", UserRouter);
        app.use("/status", statusRouter);
        app.use("/room", roomRouter);

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
    })
    .catch((error) => console.error("Erro ao conectar ao banco de dados:", error));