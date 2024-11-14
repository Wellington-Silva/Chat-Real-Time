import "dotenv/config";
import "reflect-metadata";
import express from "express";
import UserRouter from "./src/routes/UserRouter";
import http from 'http';
import { Server } from 'socket.io';
import IoController from './src/controllers/IoController';
import chatRouter from './src/routes/ChatRouter';
import { AppDataSource } from './data-source';

const app = express();
app.use(express.json());
const server = http.createServer(app);

// Configuração do Socket.io com o servidor HTTP
const io = new Server(server, {
    cors: {
        origin: '*', // Defina os domínios permitidos ou utilize '*' em desenvolvimento
        methods: ['GET', 'POST'],
    },
});

// Função para lidar com os eventos do Socket.io
io.on('connection', (socket) => {
    IoController.socketHandler(socket); // Delegue a lógica de eventos para o IoController
});


AppDataSource.initialize()
    .then(() => {

        // Routes
        app.use("/users", UserRouter);
        app.use("/chat", chatRouter);

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
    })
    .catch((error) => console.error("Erro ao conectar ao banco de dados:", error));