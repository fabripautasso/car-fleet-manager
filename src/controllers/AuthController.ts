import { Route, Controller, Tags, Post, Body } from "tsoa";
import { ProvideSingleton, inject } from "../ioc";
import { UserService } from "../services";
import { IUserCredsDto } from "../services/dto/UserCredsDto";

@Tags("Auth")
@Route("auth")
@ProvideSingleton(AuthController)
export class AuthController extends Controller {
  constructor(@inject(UserService) private service: UserService) {
    super();
  }

  /**
   * @summary User login endpoint
   *
   */
  @Post("/")
  public async login(@Body() userCreds: IUserCredsDto): Promise<string> {
    return await this.service.login(userCreds);
  }
}
