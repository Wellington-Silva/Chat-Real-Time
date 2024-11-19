import { Request, Response } from "express";
declare class RoomController {
    createRoom(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    listRooms(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: RoomController;
export default _default;
