import { Room } from 'src/room/room.entity';
import { UserStory } from 'src/userStory/userStory.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Story {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column()
  roomId: string;

  @Column({ type: 'double precision', nullable: true })
  avgPoint: number;

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

  @OneToMany(() => UserStory, (userStory) => userStory.story)
  userStories: UserStory[];

  @ManyToOne(() => Room, (room) => room.stories)
  @JoinColumn({ name: 'roomId' })
  room: Room;
}
