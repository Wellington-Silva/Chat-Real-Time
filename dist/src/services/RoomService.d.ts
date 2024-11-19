import { Room } from '../entity/Room';
declare class RoomService {
    createRoom(name: string): Promise<Room>;
    getRooms(): Promise<Room[]>;
}
declare const _default: RoomService;
export default _default;
