import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../entity/User";
import { AppDataSource } from "../../data-source";
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
        const userJWT = {
            id: user.id,
            name: user.name,
            picture: user.picture,
            email: user.email,
            password: user.password
        };

        if (user) {
            const token = jwt.sign(
                userJWT,
                process.env.JWT_SECRET as string,
                // { expiresIn: process.env.JWT_EXPIRATION || "5d" } // 5 dia de expiração
            );

            // Atualizar o status do usuário para online após a criação
            await AppDataSource.getRepository(User).update(user.id, { isOnline: true });

            // Retorna o usuário e o token
            return { user, token };
        };
        return { error: true, message: "Erro ao cadastrar usuário" };
    };

    async signin(email: string, password: string) {

        // Find user by email
        const user = await userRepository.findByEmail(email);
        if (!user) 
            return { error: true, message: "Usuário não encontrado" };

        // Compare password with hash armazened
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return { error: true, message: "Senha incorreta" };

        // Create the token JWT
        const userJWT = {
            id: user.id,
            name: user.name,
            picture: user.picture,
            email: user.email,
            password: user.password
        };

        const token = jwt.sign(
            userJWT,
            process.env.JWT_SECRET as string,
            // { expiresIn: process.env.JWT_EXPIRATION || "5d" } // Expira em 5 dias por padrão
        );

        // Atualizar o status para online
        await AppDataSource.getRepository(User).update(user.id, { isOnline: true });

        // Return token and basic data of user
        return { token, user: { id: user.id, name: user.name, email: user.email, picture: user.picture } };
    };

};

export default new UserService();