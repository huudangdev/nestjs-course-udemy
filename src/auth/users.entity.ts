import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique } from "typeorm";
import * as bcrypt from 'bcrypt'

@Entity()
@Unique(['username', 'email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  salt: string

  @Column()
  isConfirmed: boolean

  async validateUserPassword(password: string) : Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt)
    return hash === this.password
  }
}