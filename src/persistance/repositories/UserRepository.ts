import { ProvideSingleton } from "../../ioc";
import { User } from "../entities/User";
import { EntityRepository, getRepository } from "typeorm";
import { IUserCredsDto } from "../../services/dto/UserCredsDto";

@ProvideSingleton(UserRepository)
@EntityRepository()
export class UserRepository {
  private repository;
  constructor() {
    this.repository = getRepository(User);
  }

  public async save(user: User): Promise<User> {
    return await this.repository.save(user);
  }

  public async find(): Promise<User[]> {
    return await this.repository.find();
  }

  public async findByCreds(userCreds: IUserCredsDto): Promise<User> {
    const user = await this.repository
      .createQueryBuilder("user")
      .where("user_name = :userName", { userName: userCreds.userName })
      .getOne();
    if (user.password === userCreds.password) return user;
    else return null;
  }
}
