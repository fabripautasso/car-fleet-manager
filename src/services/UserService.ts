import { ProvideSingleton } from "../ioc";
import { inject } from "inversify";
import { UserRepository } from "../persistance/repositories/UserRepository";
import { IUserCredsDto } from "./dto/UserCredsDto";
import { ApiError } from "../config/ErrorHandler";
import constants from "../config/constants";
import * as jwt from "jsonwebtoken";

@ProvideSingleton(UserService)
export class UserService {
  constructor(@inject(UserRepository) private userRepository: UserRepository) {}

  public async login(userCreds: IUserCredsDto): Promise<string> {
    const valid = await this.userRepository.findByCreds(userCreds);
    if (!valid) throw new ApiError(constants.errorTypes.auth);
    return jwt.sign(JSON.stringify(valid), constants.jwtKey);
  }
}
