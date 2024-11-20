import { Request, Response } from "express";
import RoomService from "../services/RoomService";
import { IoService } from "../services/IoService";

class RoomController {

    async addMember(req: Request, res: Response) {
        const { roomId, userId } = req?.query;

        // Garantir que roomId e userId sejam strings
        const parsedRoomId = String(roomId);
        const parsedUserId = parseInt(String(userId), 10);

        if (!parsedRoomId || isNaN(parsedUserId))
            return res.status(400).json({ error: true, message: "roomId e userId são obrigatórios e devem ser válidos." });

        if (!roomId || !userId)
            return res.status(400).json({ error: true, message: "roomId e userId são obrigatórios." });

        try {
            const updatedRoom = await RoomService.addMemberToRoom(parsedRoomId, parsedUserId);
            return res.status(200).json({ success: true, room: updatedRoom });
        } catch (error) {
            res.status(500).json({ error: true, message: "Erro ao adicionar participante" });
        }
    };

    async sendMessageToRoom(req: Request, res: Response) {
        const { roomId } = req.query;
        const { content, senderId } = req.body;

        const roomIdString = String(roomId);

        try {
            const ioServiceInstance = new IoService();
            const message = await ioServiceInstance.sendMessageToRoom(roomIdString, content, senderId);
            res.status(201).json({ success: true, message });
        } catch (error) {
            console.error(`Error sending message: ${error}`);
            res.status(500).json({ success: false, error: error });
        }
    };

    async createRoom(req: Request, res: Response) {
        const { name, memberIds } = req.body;

        if (!name || typeof name !== 'string')
            return res.status(400).json({ error: true, message: 'Name is required and must be a string' });

        if (!Array.isArray(memberIds))
            return res.status(400).json({ error: true, message: 'Member IDs must be an array' });

        try {
            const room = await RoomService.createRoom(name, memberIds);
            return res.status(201).json(room);
        } catch (error) {
            console.error(`Error in RoomController: ${error}`);
            res.status(500).json({ error: true, message: error });
        }
    };

    async listRooms(req: Request, res: Response) {
        try {
            const rooms = await RoomService.getRooms();
            res.json(rooms);
        } catch (error) {
            res.status(500).json({ error: true, message: error });
        }
    };
}

export default new RoomController();
