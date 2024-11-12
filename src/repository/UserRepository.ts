import { AppDataSource } from "../../data-source";
import { User } from "../entity/User";

export class UserRepository {
  private userRepo = AppDataSource.getRepository(User);

  async createUser(userData: Partial<User>) {
    const user = this.userRepo.create(userData);
    return await this.userRepo.save(user);
  }

  async findAllUsers() {
    return await this.userRepo.find();
  }
}