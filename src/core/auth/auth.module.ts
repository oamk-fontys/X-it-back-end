import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "src/modules/user/user.module";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";

@Module({
  imports: [
    UserModule,
    JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '10m' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],    
})
export class AuthModule {}
