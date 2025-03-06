import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

@Exclude()
export class CreateEditGameDto {

    @Expose()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The name of the team participating in the game',
        example: 'Red Dragons',
        type: String,
    })
    teamName: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The room ID where the game is being held',
        example: 'room123',
        type: String,
    })
    roomId: string;

    @Expose()
    @IsDateString()
    @IsOptional()
    @ApiProperty({
        description: 'The start time of the game in ISO format',
        example: '2025-03-10T15:00:00.000Z',
        type: String,
        required: false,
    })
    startTime?: Date;

    @Expose()
    @IsDateString()
    @IsOptional()
    @ApiProperty({
        description: 'The end time of the game in ISO format',
        example: '2025-03-10T17:00:00.000Z',
        type: String,
        required: false,
    })
    endTime?: Date;
}