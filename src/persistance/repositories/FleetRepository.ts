import { ProvideSingleton } from "../../ioc";
import { EntityRepository, getRepository } from "typeorm";
import { Fleet } from "../entities/Fleet";

@ProvideSingleton(FleetRepository)
@EntityRepository()
export class FleetRepository {
  private repository;
  constructor() {
    this.repository = getRepository(Fleet);
  }

  public async findById(id: string): Promise<Fleet> {
    return await this.repository
      .createQueryBuilder("fleet")
      .leftJoinAndSelect("fleet.cars", "car")
      .leftJoinAndSelect("fleet.owner", "owner")
      .where("fleet.id = :id", { id: id })
      .getOne();
  }

  public async save(fleet: Fleet): Promise<Fleet> {
    return await this.repository.save(fleet);
  }
}
