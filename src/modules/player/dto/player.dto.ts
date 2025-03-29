import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserDto } from "src/modules/user/dto/user.dto";

export class PlayerDto {
  @Expose()
  @ApiProperty({
    description: 'The unique ID of the player',
    example: 'a3320ee0-7b48-4119-8569-a7d142046fd1',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @Expose()
  @ApiProperty({
    description: 'The ID of the game the player is participating in',
    example: '617949f8-0c4e-4bb8-b13b-c24fd5175f3b',
  })
  @IsString()
  @IsNotEmpty()
  gameId: string;

  @Expose()
  @ApiProperty({
    description: 'The user ID of the player, if they are a registered user',
    example: '617949f8-0c4e-4bb8-b13b-c24fd5175f3b',
    required: false,
  })
  @IsString()
  @IsOptional()
  userId?: string; // Nullable: Player may or may not be a registered user

  @Expose()
  @ApiProperty({
    description: 'Indicates whether the player is a guest',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  isGuest: boolean;

  @Expose()
  @ApiProperty({
    description: 'Indicates whether the player is an adult',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  isAdult: boolean;

  @Expose()
  @ApiProperty({
    description: 'User data associated with the player if available',
    type: UserDto,
    required: false,
  })
  @IsOptional()
  user?: UserDto;
}
