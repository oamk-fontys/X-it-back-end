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
    @IsNotEmpty()
    @ApiProperty({
        description: 'The user',
        example: '76dcdb77-5522-4deb-b8ba-8bc4b16892a3',
        type: String,
    })
    userId: string;

}
