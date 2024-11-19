import { Server } from "socket.io";
declare class SocketHandler {
    socketHandler(socket: any, io: Server): Promise<void>;
}
declare const _default: SocketHandler;
export default _default;
