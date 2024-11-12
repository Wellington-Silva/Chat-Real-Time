import { User } from "../entity/User";
export declare class UserRepository {
    private userRepo;
    createUser(userData: Partial<User>): Promise<User>;
    findAllUsers(): Promise<User[]>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
}
