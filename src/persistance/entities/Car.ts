import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Fleet } from "./Fleet";

@Entity()
export class Car {
  @PrimaryGeneratedColumn("uuid")
  public id?: string;

  @Column()
  public brand: string;

  @Column()
  public model: string;

  @Column()
  public year: number;

  @Column({ name: "in_transit" })
  public inTransit: boolean;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "created_at",
  })
  public createdAt?: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "updated_at",
  })
  public updatedAt?: Date;

  @ManyToOne(type => Fleet)
  @JoinColumn({ name: "fleet_id" })
  public fleet?: Fleet;
}
