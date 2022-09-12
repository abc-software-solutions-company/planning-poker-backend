import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Story } from '../story/story.entity';
import { Act } from '../act/act.entity';
import { User } from '../user/user.entity';

@Entity()
export class Room {
  @PrimaryColumn({ type: 'varchar', length: 6 })
  id: string;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column({ nullable: true })
  hostUserId: string | null;

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

  @ManyToOne(() => User, (user) => user.room)
  @JoinColumn({ name: 'hostUserId' })
  user: User;

  @OneToMany(() => Act, (act) => act.room)
  acts: Act[];

  @OneToMany(() => Story, (story) => story.room)
  stories: Story[];
}
