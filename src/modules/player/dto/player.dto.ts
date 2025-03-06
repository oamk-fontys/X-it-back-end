import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  gameId: string;

  @IsString()
  @IsOptional()
  userId?: string; // Nullable: Player may or may not be a registered user

  @IsBoolean()
  @IsNotEmpty()
  isGuest: boolean;

  @IsBoolean()
  @IsNotEmpty()
  isAdult: boolean;
}

export class UpdatePlayerDto {
  @IsBoolean()
  @IsOptional()
  isGuest?: boolean;

  @IsBoolean()
  @IsOptional()
  isAdult?: boolean;
}
