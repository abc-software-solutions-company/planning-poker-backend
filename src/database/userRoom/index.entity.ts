import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Room } from '../room/index.entity';
import { User } from '../user/index.entity';

@Entity()
export class UserRoom {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  roomId: string;

  @Column({ type: 'boolean', default: true })
  isOnline: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Room, (room) => room.id)
  @JoinColumn({ name: 'roomId' })
  room: Room;
}
