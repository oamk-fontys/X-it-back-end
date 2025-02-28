import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/modules/user/user.service';
import { AccessCodeDto } from './dto/access-code.dto';
import { RegisterDto } from './dto/register.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async signIn(body: SignInDto) {
    const user = await this.userService.getUserByEmail(body.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await compare(body.password, user.password);

    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { ...user };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  public async register(body: RegisterDto) {
    if (body.password !== body.confirmPassword) {
      throw new BadRequestException(
        'Password and confirm password do not match',
      );
    }

    const duplicatedAccount = await this.userService.doesUserExist(
      body.email,
      body.username,
    );

    if (duplicatedAccount) {
      throw new BadRequestException(
        'There is already an account with this email or username',
      );
    }

    const user = await this.userService.createUser(body);

    return user;
  }

  public async signInByAccessCode(body: AccessCodeDto) {
    const user = await this.userService.getUserByAccessCode(body.accessCode);

    if (!user) {
      throw new UnauthorizedException('Invalid access code');
    }

    if (user.companyId !== body.companyId) {
      throw new UnauthorizedException(
        'You are not authorized to access this company',
      );
    }

    const payload = { ...user };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
