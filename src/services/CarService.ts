import { inject, ProvideSingleton } from "../ioc";
import { CarRepository } from "../persistance/repositories/CarRepository";
import { ICarUpdateDto } from "./dto/CarUpdateDto";
import { ICarDto } from "./dto/CarAddDto";
import { Car } from "../persistance/entities/Car";

@ProvideSingleton(CarService)
export class CarService {
  constructor(@inject(CarRepository) private carRepository: CarRepository) {}
  public async updateCarStatus(id: string, carUpdateDto: ICarUpdateDto): Promise<any> {
    return await this.carRepository.updateStatus(id, carUpdateDto);
  }

  public async getAvailableCars(): Promise<ICarDto[]> {
    const cars = await this.carRepository.findAvailable();
    return await Promise.all(
      cars.map(async car => {
        return await this.formatCar(car);
      }),
    );
  }

  public async checkCarAvailability(id: string) {
    return await this.carRepository.findAvailableById(id);
  }

  private async formatCar(car: Car): Promise<ICarDto> {
    return {
      id: car.id,
      brand: car.brand,
      model: car.model,
      year: car.year,
      inTransit: car.inTransit,
    };
  }
}
