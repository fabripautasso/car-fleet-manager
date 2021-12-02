import { Route, Controller, Tags, Post, Delete, Get, Security, Request } from "tsoa";
import { ProvideSingleton, inject } from "../ioc";
import { FleetService } from "../services/FleetService";
import { IFleetOwnerDto } from "../services/dto/FleetOwnerDto";
import { IFleetDto } from "../services/dto/FleetDto";

@Tags("Fleet")
@Route("fleets")
@ProvideSingleton(FleetController)
export class FleetController extends Controller {
  constructor(@inject(FleetService) private service: FleetService) {
    super();
  }

  /**
   * @summary Adds a car to the fleet
   *
   * @param id fleet ID
   * @param carId car ID
   *
   * @pattern id [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12} "Format error"
   * @pattern carId [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12} "Format error"
   *
   */
  @Security("jwt")
  @Post("{id}/cars/{carId}")
  public async addCar(id: string, carId: string, @Request() request: any): Promise<IFleetDto> {
    const fleetOwner: IFleetOwnerDto = await Promise.resolve(request.user);
    return await this.service.addCar(id, carId, fleetOwner);
  }

  /**
   * @summary Removes a car from the fleet
   *
   * @param id fleet ID
   * @param carId car ID
   *
   * @pattern id [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12} "Format error"
   * @pattern carId [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12} "Format error"
   *
   */
  @Security("jwt")
  @Delete("{id}/cars/{carId}")
  public async deleteCar(id: string, carId: string, @Request() request: any): Promise<IFleetDto> {
    const fleetOwner: IFleetOwnerDto = await Promise.resolve(request.user);
    return await this.service.deleteCar(id, carId, fleetOwner);
  }

  /**
   * @summary Retrieves all the cars for a fleet
   *
   * @param id fleet ID
   *
   * @pattern id [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12} "Format error"
   *
   */
  @Security("jwt")
  @Get("{id}/cars")
  public async getCars(id: string, @Request() request: any): Promise<IFleetDto> {
    const fleetOwner: IFleetOwnerDto = await Promise.resolve(request.user);
    return await this.service.getCars(id, fleetOwner);
  }
}
