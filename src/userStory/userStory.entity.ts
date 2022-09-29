import { Story } from 'src/story/story.entity';
import { User } from 'src/user/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class UserStory {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  storyId: string;

  @Column({ type: 'int', nullable: true })
  votePoint: number;

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

  @ManyToOne(() => Story, (story) => story.id)
  @JoinColumn({ name: 'storyId' })
  story: Story;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;
}
