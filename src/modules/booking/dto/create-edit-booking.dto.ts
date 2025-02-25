import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

@Exclude()
export class CreateEditBookingDto {

    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The Id of the room',
        example: '398efad7-bb91-4f71-ae51-57b5a394b225',
        type: String,
    })
    roomId: string;

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
    weekday: string;
}
