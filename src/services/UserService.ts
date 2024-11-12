import bcrypt from "bcryptjs";
import { UserRepository } from "../repository/UserRepository";

const userRepository = new UserRepository();

class UserService {

    async getAll() {
        const users = await userRepository.findAllUsers();
        if (users) return users;
        return { error: true, message: "Nenhum usuário encontrado" };
    };

    async getUserById(id: number) {
        const user = await userRepository.findById(id);
        if (user) return user;
        return { error: true, message: "Usuário não encontrado" }
    };

    async create(name: string, picture: string, email: string, password: string) {

        // Create hash
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save
        const user = await userRepository.createUser({ name, picture, email, password: hashedPassword });

        // Create token JWT

        if (user) return user;
        return { error: true, message: "Erro ao cadastrar usuário" };
    };

    async signin(email: string, password: string) {
        const user = await userRepository.findByEmail(email);
        if (!user) return { error: true, message: "Usuário não encontrado" };

        // Compara a senha fornecida com o hash armazenado
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // transformar user em token jwt
        
        return isPasswordValid;
    };

};

export default new UserService();