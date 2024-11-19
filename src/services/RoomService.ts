import { Room } from '../entity/Room';
import { User } from '../entity/User';
import { AppDataSource } from '../../data-source';

class RoomService {
    private roomRepository = AppDataSource.getRepository(Room);
    private userRepository = AppDataSource.getRepository(User);

    async createRoom(name: string, memberIds: number[]) {
        try {
            // Verifica se já existe uma sala com o mesmo nome
            const existingRoom = await this.roomRepository.findOneBy({ name });
            if (existingRoom) {
                throw new Error('A room with this name already exists');
            }

            // Busca os usuários pelo array de IDs
            const members = await this.userRepository.findByIds(memberIds);

            if (members.length === 0) {
                throw new Error('No valid members found for the room');
            }

            const newRoom = this.roomRepository.create({ name, members });
            return await this.roomRepository.save(newRoom);
        } catch (error) {
            throw new Error(`Error creating room: ${error}`);
        }
    }

    async getRooms() {
        try {
            return await this.roomRepository.find({ relations: ['members'] });
        } catch (error) {
            throw new Error(`Error fetching rooms: ${error}`);
        }
    }
}

export default new RoomService();
