import { Route, Controller, Tags, Request, Put, Body, Get, Security } from "tsoa";
import { ProvideSingleton, inject } from "../ioc";
import { CarService } from "../services/CarService";
import { ICarUpdateDto } from "../services/dto/CarUpdateDto";
import { ICarDto } from "../services/dto/CarAddDto";

@Tags("Car")
@Route("cars")
@ProvideSingleton(CarController)
export class CarController extends Controller {
  constructor(@inject(CarService) private service: CarService) {
    super();
  }

  /**
   * @summary Updates car status. On the road (true) | In a garage (false)
   *
   * @param id car ID
   * @param carUpdateDto car public object
   *
   * @pattern id [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12} "Format error"
   */
  @Put("/{id}")
  @Security("jwt")
  public async updateStatus(
    @Request() request: any,
    id: string,
    @Body() carUpdateDto: ICarUpdateDto,
  ): Promise<ICarDto> {
    return await this.service.updateCarStatus(id, carUpdateDto);
  }

  /**
   * @summary Retrieve cars that are not currently on a fleet
   *
   */
  @Security("jwt")
  @Get("/")
  public async getAvailableCars(@Request() request: any): Promise<ICarDto[]> {
    return await this.service.getAvailableCars();
  }
}
