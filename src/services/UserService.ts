import { UserRepository } from "../repository/UserRepository";

const userRepository = new UserRepository();

class UserService {

    async create(name: string, picture: string, email: string, password: string) {
        const user = await userRepository.createUser({ name, picture, email, password });
        if (user) return user
        return { error: true, message: "Erro ao cadastrar usuário" };
    };

};

export default new UserService();