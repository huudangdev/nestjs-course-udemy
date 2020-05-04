import { Repository, EntityRepository } from "typeorm";
import { User } from "./users.entity";
import { AuthCredential } from "./dto/auth.credential";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

import * as bcrypt from 'bcrypt'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  
  async signUp(authCredential: AuthCredential): Promise<void> {
    const {username, email, password} = authCredential
    
    const newUser = new User()
    newUser.username = username
    newUser.email = email
    newUser.isConfirmed = false
    newUser.salt = await bcrypt.genSalt()
    newUser.password = await this.hashPassword(password, newUser.salt)

    try {
      await newUser.save()

    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username/Email already exist')
      }
      else {
        throw new InternalServerErrorException()
      }
    }
  }

  private async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt)
  }
}