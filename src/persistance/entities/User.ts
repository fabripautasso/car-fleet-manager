import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Fleet } from "./Fleet";
import { EncryptionTransformer } from "typeorm-encrypted";
import constants from "../../config/constants";

const encryptionTransformer = new EncryptionTransformer(constants.encryptionTransformerConfig);

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  public id?: string;

  @Column({ unique: true, name: "user_name" })
  public userName: string;

  @Column({ transformer: encryptionTransformer })
  public password: string;

  @OneToMany(type => Fleet, fleet => fleet.owner)
  public fleets?: Fleet[];
}
