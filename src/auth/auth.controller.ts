import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredential } from './dto/auth.credential';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @Post('/signup')
  async signUp(@Body(ValidationPipe) authCredential: AuthCredential): Promise<void> {
    return this.authService.signUp(authCredential)
  }

  @Post('/signIn') 
  async signIn(@Body(ValidationPipe) authCredential: AuthCredential): Promise<void> {
    return this.authService.signIn(authCredential)
  }
}
