import { Request, Response } from 'express';
declare class IoController {
    sendMessage(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getMessageHistory(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: IoController;
export default _default;
