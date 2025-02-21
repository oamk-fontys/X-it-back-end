import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AccessCodeDto } from './dto/access-code.dto';
import { RegisterDto } from './dto/register.dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('access-code')
  @ApiOkResponse({
    description: 'Sign in by access code',
    type: AccessCodeDto,
  })
  async accessCode(@Body() body: AccessCodeDto) {
    return this.authService.signInByAccessCode(body);
  }
}
