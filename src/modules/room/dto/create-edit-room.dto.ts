import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

@Exclude()
export class CreateEditRoomDto {

    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The name of the room',
        example: 'Room One',
        type: String,
    })
    name: string;

    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The description of the room',
        example: 'This is room one',
        type: String,
    })
    description: string;

    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The id of the company',
        example: '3',
        type: String,
    })
    companyId: string;

}