import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, IsDateString } from "class-validator";

@Exclude()
export class CreateEditGameDto {

    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The name of the team participating in the game',
        example: 'Team A',
        type: String,
    })
    teamName: string;

    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The ID of the room where the game will take place',
        example: 'room123',
        type: String,
    })
    roomId: string;

    @Expose()
    @IsOptional()
    @IsDateString()
    @ApiProperty({
        description: 'The start time of the game (optional)',
        example: '2025-03-15T10:00:00Z',
        type: String,
        required: false,
    })
    startTime?: string | null;

    @Expose()
    @IsOptional()
    @IsDateString()
    @ApiProperty({
        description: 'The end time of the game (optional)',
        example: '2025-03-15T12:00:00Z',
        type: String,
        required: false,
    })
    endTime?: string | null;

    @Expose()
    @IsString()
    @ApiProperty({
        description: 'The ID of the booking associated with this game',
        example: '617949f8-0c4e-4bb8-b13b-c24fd5175f3b',
        type: String,
        required: true,
    })
    bookingId: string;
}