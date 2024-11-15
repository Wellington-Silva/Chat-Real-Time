import { Request, Response } from 'express';
declare class StatusController {
    getUserStatus(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
declare const _default: StatusController;
export default _default;
