import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export class RequestWithQRCode extends Request {
  qr: {
    userId: string;
    bookingId: string;
  };
}

@Injectable()
export class BookingGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { token } = request.body;

    try {
      const decoded = await this.jwtService.verifyAsync(token);

      request['qr'] = decoded;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
