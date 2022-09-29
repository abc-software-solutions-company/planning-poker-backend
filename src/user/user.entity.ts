import { Room } from 'src/database/room/index.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
<<<<<<< Updated upstream:src/database/user/index.entity.ts
import { UserRoom } from '../userRoom/index.entity';
=======
import { Room } from '../room/room.entity';
import { UserRoom } from '../userRoom/userRoom.entity';
>>>>>>> Stashed changes:src/user/user.entity.ts
import { UserStory } from '../userStory/index.entity';

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
