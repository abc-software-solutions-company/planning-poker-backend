import { Room } from 'src/database/room/room.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Story } from '../story/story.entity';
import { User } from '../user/user.entity';

@Entity()
export class UserStoryRoom {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  storyId: string;

  @PrimaryColumn()
  roomId: number;

  @ManyToOne(() => User, (user) => user.usrs)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'boolean', default: true })
  isOnline: boolean;

  @Column({ type: 'int', nullable: true })
  storyPoint: number;

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

  @ManyToOne(() => Story, (story) => story.id)
  @JoinColumn({ name: 'storyId' })
  story: Story;

  @ManyToOne(() => Room, (room) => room.id)
  @JoinColumn({ name: 'roomId' })
  room: Room;
}
