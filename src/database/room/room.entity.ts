import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Pool } from '../pool/pool.entity';
import { Story } from '../story/story.entity';
import { User } from '../user/user.entity';
import { UserRoom } from '../userRoom/userRoom.entity';

@Entity()
export class Room {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 32 })
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

  @OneToOne(() => Pool, (pool) => pool.id)
  @JoinColumn({ name: 'id' })
  pool: Pool;

  @ManyToOne(() => User, (user) => user.rooms)
  @JoinColumn({ name: 'hostUserId' })
  user: User;

  @OneToMany(() => UserRoom, (userRoom) => userRoom.room)
  userRooms: UserRoom[];

  @OneToMany(() => Story, (story) => story.room)
  stories: Story[];
}
