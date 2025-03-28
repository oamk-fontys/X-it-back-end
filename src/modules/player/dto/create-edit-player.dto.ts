import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserDto } from "src/modules/user/dto/user.dto";

@Exclude()
export class CreateEditPlayerDto {

    @Expose()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The ID of the game the player is joining',
        example: 'game123',
        type: String,
    })
    gameId: string;

    @Expose()
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The ID of the user (if the player is a registered user)',
        example: 'user456',
        type: String,
        required: false
    })
    userId?: string; // Nullable: Player may or may not be a registered user

    @Expose()
    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Indicates if the player is a guest (not a registered user)',
        example: true,
        type: Boolean,
    })
    isGuest: boolean;

    @Expose()
    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Indicates if the player is an adult',
        example: true,
        type: Boolean,
    })
    isAdult: boolean;
}
