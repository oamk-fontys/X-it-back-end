import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

@Exclude()
export class BookingDto {

    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The Id of the room',
        example: '398efad7-bb91-4f71-ae51-57b5a394b225',
        type: String,
    })
    roomId: number;

    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The id of the user',
        example: 'b192f03a-ee56-4928-9cea-346bfae94449',
        type: String,
    })
    userId: string;

    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The weekday of the booking',
        example: 'Monday',
        type: String,
    })
    weekDay: string;

    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        description: 'created at booking',
        example: '2025-21-02',
        type: Date,
    })
    createdAt: Date;

    @Expose()
    @ApiProperty({
        description: 'updated at booking',
        example: '2025-22-02',
        type: Date,
    })
    updatedAt: Date;
}