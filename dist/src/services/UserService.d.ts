declare class UserService {
    getAll(): Promise<import("../entity/User").User[] | {
        error: boolean;
        message: string;
    }>;
    create(name: string, picture: string, email: string, password: string): Promise<import("../entity/User").User | {
        error: boolean;
        message: string;
    }>;
}
declare const _default: UserService;
export default _default;
