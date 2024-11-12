declare class UserService {
    getAll(): Promise<import("../entity/User").User[] | {
        error: boolean;
        message: string;
    }>;
    getUserById(id: number): Promise<import("../entity/User").User | {
        error: boolean;
        message: string;
    }>;
    create(name: string, picture: string, email: string, password: string): Promise<{
        user: import("../entity/User").User;
        token: string;
        error?: undefined;
        message?: undefined;
    } | {
        error: boolean;
        message: string;
        user?: undefined;
        token?: undefined;
    }>;
    signin(email: string, password: string): Promise<boolean | {
        error: boolean;
        message: string;
    }>;
}
declare const _default: UserService;
export default _default;
