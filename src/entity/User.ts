// src/entity/User.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Message } from './Message';

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

   // Relacionamento com mensagens enviadas
   @OneToMany(() => Message, (message) => message.sender)
   sentMessages: Message[];
 
   // Relacionamento com mensagens recebidas
   @OneToMany(() => Message, (message) => message.recipient)
   receivedMessages: Message[];

}
