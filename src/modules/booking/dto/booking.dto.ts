import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { RoomDto } from "src/modules/room/dto/room.dto";
import { UserDto } from "src/modules/user/dto/user.dto";

@Exclude()
export class BookingDto {

    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The room',
        example: 'id 398efad7-bb91-4f71-ae51-57b5a394b225, name Room One, description This is room one,companyId b52c7efd-2372-470c-9ff4-4cbf682e5a4f, createdAt 2025-02-28 09:52:47.314, updatedAt 2025-02-28 09:52:47.314',
        type: RoomDto,
    })
    room: RoomDto;

    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The user',
        example: ' UserId 76dcdb77-5522-4deb-b8ba-8bc4b16892a3, createdAt 2025-02-28 09:52:47.314, dateOfBirth 2017-06-07 14:34:08.700, email test@example.com, firstName Test, lastName User, password password123',
        type: UserDto,
    })
    user: UserDto;

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