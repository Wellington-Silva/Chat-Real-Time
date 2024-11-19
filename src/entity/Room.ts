import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from './User';
import { Message } from './Message';

@Entity()
export class Room {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToMany(() => User)
    @JoinTable()
    members: User[];

    @OneToMany(() => Message, (message) => message.room)
    messages: Message[];
}
