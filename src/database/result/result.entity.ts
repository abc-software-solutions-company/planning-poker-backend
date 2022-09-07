import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Story } from '../story/story.entity';
import { User } from '../user/user.entity';

@Entity()
export class Result {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  storyId: string;

  @Column({ type: 'int', nullable: true })
  votePoint: number;

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

  @ManyToOne(() => User, (user) => user.results)
  @JoinColumn({ name: 'userId' })
  user: User;
}
