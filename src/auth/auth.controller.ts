import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthCredential } from './dto/auth.credential';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @Post('/signup')
  async signUp(@Body(ValidationPipe) authCredential: AuthCredential): Promise<void> {
    return this.authService.signUp(authCredential)
  }

  @Post('/signin') 
  async signIn(@Body(ValidationPipe) authCredential: AuthCredential): Promise<{accessToken: string}> {
    return this.authService.signIn(authCredential)
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req)
  }
}
