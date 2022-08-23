import { Room } from 'src/rooms/rooms.entity';
import { Story } from 'src/stories/stories.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserStoryRoom {
  @PrimaryColumn()
  user_id: string;
  @PrimaryColumn()
  story_id: string;
  @PrimaryColumn()
  room_id: number;

  @ManyToOne(() => User, (user) => user.usrs)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Story, (story) => story.id)
  @JoinColumn({ name: 'story_id' })
  story: Story;

  @ManyToOne(() => Room, (room) => room.id)
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @Column({ type: 'boolean' })
  is_online: boolean;

  @Column({ type: 'int', nullable: true })
  story_point: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
