import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Room } from './Room';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @ManyToOne(() => User, (user) => user.sentMessages)
    @JoinColumn({ name: 'senderId' })
    sender: User;

    @ManyToOne(() => User, (user) => user.receivedMessages)
    @JoinColumn({ name: 'recipientId' })
    recipient: User;

    @Column()
    senderId: number;

    @Column({ nullable: true })
    recipientId: number;

    @ManyToOne(() => Room, (room) => room.messages)
    @JoinColumn({ name: 'roomId' })
    room: Room;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
