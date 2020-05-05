import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { async } from 'rxjs/internal/scheduler/async';
import { AuthCredential } from './dto/auth.credential';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  async signUp(authCredential: AuthCredential): Promise<void> {
    return this.userRepository.signUp(authCredential)
  }

  async signIn(authCredential: AuthCredential): Promise<void> {
    const username = await this.userRepository.validateUserPassword(authCredential)

    if (!username) {
      throw new UnauthorizedException('Invalid Credential')
    }
  }
}
