import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

@Exclude()
export class CreateEditBookingDto {

    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The roomId',
        example: '398efad7-bb91-4f71-ae51-57b5a394b225',
        type: String,
    })
    roomId: string;

    @Expose()
    @ApiProperty({
        description: 'This is the timeslotId',
        example: '534c2bd4-9ee9-43eb-9488-369fc7ba42fe',
        type: String,
    })
    timeslotId: string;

    @Expose()
    @ApiProperty({
        description: 'The booking date',
        example: '2022-12-01T06:56:54.240Z',
        type: Date,
    })
    date: Date;
}
