import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique } from "typeorm";

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
}