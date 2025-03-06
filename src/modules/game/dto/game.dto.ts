import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  teamName: string;

  @IsString()
  @IsNotEmpty()
  roomId: string;

  @IsDateString()
  @IsOptional()
  startTime?: Date;

  @IsDateString()
  @IsOptional()
  endTime?: Date;
}

export class UpdateGameDto {
  @IsString()
  @IsOptional()
  teamName?: string;

  @IsString()
  @IsOptional()
  roomId?: string;

  @IsDateString()
  @IsOptional()
  startTime?: Date;

  @IsDateString()
  @IsOptional()
  endTime?: Date;
}

