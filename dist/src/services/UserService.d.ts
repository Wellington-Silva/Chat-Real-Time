import "dotenv/config";
import { User } from "../entity/User";
declare class UserService {
    getAll(): Promise<User[] | {
        error: boolean;
        message: string;
    }>;
    getUserById(id: number): Promise<User | {
        error: boolean;
        message: string;
    }>;
    create(name: string, picture: string, email: string, password: string): Promise<{
        user: User;
        token: string;
        error?: undefined;
        message?: undefined;
    } | {
        error: boolean;
        message: string;
        user?: undefined;
        token?: undefined;
    }>;
    signin(email: string, password: string): Promise<{
        error: boolean;
        message: string;
        token?: undefined;
        user?: undefined;
    } | {
        token: string;
        user: {
            id: number;
            name: string;
            email: string;
            picture: string;
        };
        error?: undefined;
        message?: undefined;
    }>;
}
declare const _default: UserService;
export default _default;
