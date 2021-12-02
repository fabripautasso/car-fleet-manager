import { inject, ProvideSingleton } from "../ioc";
import { FleetRepository } from "../persistance/repositories/FleetRepository";
import { CarRepository } from "../persistance/repositories/CarRepository";
import { UserRepository } from "../persistance/repositories/UserRepository";

@ProvideSingleton(SeedDb)
export class SeedDb {
  constructor(
    @inject(FleetRepository) private fleetRepository: FleetRepository,
    @inject(CarRepository) private carRepository: CarRepository,
    @inject(UserRepository) private userRepository: UserRepository,
  ) {}

  public async run() {
    const users = await this.userRepository.find();
    const alreadySeed = users.length > 0;
    if (alreadySeed) return;

    const user1 = await this.userRepository.save({ userName: "test@test.com", password: "test" });
    const user2 = await this.userRepository.save({ userName: "test2@test.com", password: "test2" });

    await this.fleetRepository.save({
      id: "3ebe48e1-fb66-49fd-ba77-089ea590c4b7",
      owner: user1,
      name: "Test fleet 1",
    });
    await this.fleetRepository.save({
      id: "23537fab-9d3a-42c1-aeae-fb02ca0131d9",
      owner: user2,
      name: "Test fleet 2",
    });

    await this.carRepository.save({ brand: "BMW", model: "X1", year: 2021, inTransit: true });
    await this.carRepository.save({ brand: "BMW", model: "X5", year: 2021, inTransit: true });
    await this.carRepository.save({
      brand: "Mercedes Benz",
      model: "A Class",
      year: 2021,
      inTransit: true,
    });
    await this.carRepository.save({
      brand: "Mercedes Benz",
      model: "B Class",
      year: 2021,
      inTransit: true,
    });
  }
}
