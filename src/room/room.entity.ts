import { Story } from 'src/story/story.entity';
import { User } from 'src/user/user.entity';
import { UserRoom } from 'src/userRoom/userRoom.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Room {
  @PrimaryColumn({ type: 'varchar', length: 5 })
  id: string;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column()
  hostUserId: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    select: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    select: false,
  })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.rooms)
  @JoinColumn({ name: 'hostUserId' })
  user: User;

  @OneToMany(() => UserRoom, (userRoom) => userRoom.room)
  userRooms: UserRoom[];

  @OneToMany(() => Story, (story) => story.room)
  stories: Story[];
}
