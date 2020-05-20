import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique, OneToMany } from "typeorm";
import * as bcrypt from 'bcrypt'
import { Task } from "src/tasks/tasks.entity";

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  // @Column()
  // email: string

  @Column()
  password: string

  @Column()
  salt: string

  @Column()
  isConfirmed: boolean

  @OneToMany(type => Task, task => task.user, {eager: true})
  tasks: Task[]

  async validatePassword(password: string) : Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt)
    return hash === this.password
  }
}