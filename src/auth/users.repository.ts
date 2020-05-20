import { Repository, EntityRepository } from "typeorm";
import { User } from "./users.entity";
import { AuthCredential } from "./dto/auth.credential";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

import * as bcrypt from 'bcrypt'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  
  async signUp(authCredential: AuthCredential): Promise<void> {
    const {username, password} = authCredential
    const newUser = new User()
    newUser.username = username
    // newUser.email = email
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

  async validateUserPassword(authCredential: AuthCredential): Promise<string> {
    const {username, password} = authCredential
    const user = await this.findOne({username})

    if (user && await user.validatePassword(password)) {
      return user.username
    } else {
      return null
    }
  }

  private async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt)
  }
}