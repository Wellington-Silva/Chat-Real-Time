// src/entity/User.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  picture: string;
  
  @Column()
  email: string;

  @Column()
  password: string;

}
