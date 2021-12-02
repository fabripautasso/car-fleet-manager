import { ProvideSingleton } from "../../ioc";
import { EntityRepository, getRepository } from "typeorm";
import { Car } from "../entities/Car";
import { ICarUpdateDto } from "../../services/dto/CarUpdateDto";

@ProvideSingleton(CarRepository)
@EntityRepository()
export class CarRepository {
  private repository;
  constructor() {
    this.repository = getRepository(Car);
  }

  public async updateStatus(id: string, carUpdateDto: ICarUpdateDto) {
    return await this.repository.save({ id: id, inTransit: carUpdateDto.status });
  }

  public async save(car: Car): Promise<Car> {
    return await this.repository.save(car);
  }

  public async findAvailable(): Promise<Car[]> {
    return await this.repository
      .createQueryBuilder("car")
      .where("car.fleet.id IS NULL")
      .getMany();
  }

  public async findAvailableById(id: string): Promise<Car> {
    return await this.repository
      .createQueryBuilder("car")
      .where("car.fleet.id IS NULL")
      .andWhere("car.id = :id", { id: id })
      .getOne();
  }
}
