import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { TaskStatus } from './tasks.status.enum';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
