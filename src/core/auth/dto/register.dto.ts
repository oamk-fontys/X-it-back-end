import { IsString } from "class-validator";
import { Exclude, Expose } from "class-transformer";
import { SignInDto } from "./sign-in.dto";

@Exclude()
export class RegisterDto extends SignInDto {
  @Expose()
  @IsString()
  passwordConfirmation: string;

}