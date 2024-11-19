import { Request, Response } from "express";
import RoomService from "../services/RoomService";
import { IoService } from "../services/IoService";

class RoomController {

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
            return res.status(500).json({ error: true, message: error });
        }
    };

    async listRooms(req: Request, res: Response) {
        try {
            const rooms = await RoomService.getRooms();
            return res.json(rooms);
        } catch (error) {
            return res.status(500).json({ error: true, message: error });
        }
    };
}

export default new RoomController();
