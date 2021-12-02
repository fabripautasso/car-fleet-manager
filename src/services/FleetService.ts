import { inject, ProvideSingleton } from "../ioc";
import { FleetRepository } from "../persistance/repositories/FleetRepository";
import { CarService } from "./CarService";
import { ApiError } from "../config/ErrorHandler";
import constants from "../config/constants";
import { IFleetOwnerDto } from "./dto/FleetOwnerDto";
import { Fleet } from "../persistance/entities/Fleet";
import { IFleetDto } from "./dto/FleetDto";
import { Logger } from "../config/Logger";

@ProvideSingleton(FleetService)
export class FleetService {
  constructor(
    @inject(FleetRepository) private fleetRepository: FleetRepository,
    @inject(CarService) private carService: CarService,
  ) {}
  public async addCar(id: string, carId: string, fleetOwner: IFleetOwnerDto): Promise<IFleetDto> {
    const fleet = await this.validateFleetOwnership(id, fleetOwner);

    const availableCar = await this.carService.checkCarAvailability(carId);
    if (!availableCar) throw new ApiError(constants.errorTypes.unavailableCar);

    fleet.cars.push(availableCar);
    fleet.updatedAt = new Date();

    const savedFleet = await this.fleetRepository.save(fleet);
    Logger.info(`Car ${carId} was added to Fleet ${id}`);

    return await this.formatFleet(savedFleet);
  }

  public async deleteCar(
    id: string,
    carId: string,
    fleetOwner: IFleetOwnerDto,
  ): Promise<IFleetDto> {
    const fleet = await this.validateFleetOwnership(id, fleetOwner);

    fleet.cars = fleet.cars.filter(car => car.id !== carId);
    fleet.updatedAt = new Date();

    const updatedFleet = await this.fleetRepository.save(fleet);
    Logger.info(`Car ${carId} was removed from Fleet ${id}`);
    return await this.formatFleet(updatedFleet);
  }

  public async getCars(id: string, fleetOwner: IFleetOwnerDto): Promise<IFleetDto> {
    const fleet = await this.validateFleetOwnership(id, fleetOwner);
    return this.formatFleet(fleet);
  }

  private async validateFleetOwnership(
    fleetId: string,
    fleetOwner: IFleetOwnerDto,
  ): Promise<Fleet> {
    const fleet = await this.fleetRepository.findById(fleetId);
    if (fleet && fleet.owner.id === fleetOwner.id) {
      return fleet;
    } else throw new ApiError(constants.errorTypes.auth);
  }

  private async formatFleet(fleet: Fleet): Promise<IFleetDto> {
    return {
      id: fleet.id,
      createdAt: fleet.createdAt,
      updatedAt: fleet.updatedAt,
      cars: fleet.cars.map(car => ({
        id: car.id,
        brand: car.brand,
        model: car.model,
        year: car.year,
        inTransit: car.inTransit,
      })),
    };
  }
}
