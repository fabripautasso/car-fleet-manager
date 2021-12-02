import { generateMockUUID } from "../../../utils/models";
import { anything, instance, mock, when } from "ts-mockito";
import { FleetService } from "../../../services/FleetService";
import { FleetRepository } from "../../../persistance/repositories/FleetRepository";
import { CarService } from "../../../services/CarService";
import { expect } from "chai";
import constants from "../../../config/constants";

describe("FleetService tests", () => {
  let service: FleetService;
  let repository: FleetRepository;
  let carService: CarService;

  const fleetId = generateMockUUID();
  const carId = generateMockUUID();
  const testOwner = {
    id: generateMockUUID(),
    userName: "test",
    password: "test",
  };
  const testFleet = { id: fleetId, name: "test fleet", cars: [], owner: testOwner };
  const testCar = { id: carId, brand: "BMW", model: "X1", inTransit: true, year: 2021 };

  before(async () => {
    repository = mock(FleetRepository);
    carService = mock(CarService);
    service = new FleetService(instance(repository), instance(carService));
  });

  it("should addCar", async () => {
    when(repository.findById(fleetId)).thenReturn(Promise.resolve(testFleet));
    when(carService.checkCarAvailability(carId)).thenReturn(Promise.resolve(testCar));

    when(repository.save(anything())).thenReturn(Promise.resolve(testFleet));
    const savedFleet = await service.addCar(fleetId, carId, testOwner);

    expect(savedFleet.id).to.not.equal(null);
    expect(savedFleet.cars.length).to.equal(1);
  });

  it("should not addCar - Invalid owner", async () => {
    when(repository.findById(fleetId)).thenReturn(null);
    try {
      await service.addCar(fleetId, carId, testOwner);
    } catch (e) {
      expect(e.message).to.equal(constants.errorTypes.auth.message);
    }
  });

  it("should not addCar - Car not available", async () => {
    when(repository.findById(fleetId)).thenReturn(Promise.resolve(testFleet));
    when(carService.checkCarAvailability(carId)).thenReturn(Promise.resolve(null));

    try {
      await service.addCar(fleetId, carId, testOwner);
    } catch (e) {
      expect(e.message).to.equal(constants.errorTypes.unavailableCar.message);
    }
  });
});
