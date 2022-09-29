import { Room } from 'src/room/room.entity';
import { UserRoom } from 'src/userRoom/userRoom.entity';
import { UserStory } from 'src/userStory/userStory.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 32 })
  name: string;

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

  @OneToMany(() => Room, (room) => room.user)
  rooms: Room[];

  @OneToMany(() => UserRoom, (userRoom) => userRoom.user)
  userRooms: UserRoom[];

  @OneToMany(() => UserStory, (userStory) => userStory.user)
  userStories: UserStory[];
}
