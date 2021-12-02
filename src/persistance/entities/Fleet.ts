import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Car } from "./Car";
import { User } from "./User";

@Entity()
export class Fleet {
  @PrimaryGeneratedColumn("uuid")
  public id?: string;

  @Column()
  public name: string;

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

  @OneToMany(type => Car, car => car.fleet)
  public cars?: Car[];

  @ManyToOne(type => User)
  @JoinColumn({ name: "user_id" })
  public owner?: User;
}
