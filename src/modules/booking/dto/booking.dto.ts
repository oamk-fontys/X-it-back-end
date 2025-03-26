import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { RoomDto } from "src/modules/room/dto/room.dto";
import { MinimalUserDto } from "src/modules/user/dto/minimal-user.dto";
import { UserDto } from "src/modules/user/dto/user.dto";

@Exclude()
export class BookingDto {

    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The room',
        type: RoomDto,
    })
    room: RoomDto;

    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The user',
        type: MinimalUserDto,
    })
    user: MinimalUserDto;

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