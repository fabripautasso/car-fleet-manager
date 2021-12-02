import { ICarDto } from "./CarAddDto";

export interface IFleetDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  cars: ICarDto[];
}
