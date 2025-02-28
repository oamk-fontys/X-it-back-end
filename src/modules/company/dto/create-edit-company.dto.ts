import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { UserDto } from "src/modules/user/dto/user.dto";

@Exclude()
export class CreateEditCompanyDto {

    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The name of the company',
        example: 'Jumbo',
        type: String,
    })
    name: string;

    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The address of the company',
        example: 'Rachelsmolen 1, 5612 MA Eindhoven',
        type: String,
    })
    address: string;

    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The owner',
        example: ' UserId 76dcdb77-5522-4deb-b8ba-8bc4b16892a3, createdAt 2025-02-28 09:52:47.314, dateOfBirth 2017-06-07 14:34:08.700, email test@example.com, firstName Test, lastName User, password password123',
        type: UserDto,
    })
    userDto: UserDto;

    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The city of the company',
        example: 'Amsterdam',
        type: String,
    })
    city: string;

    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The postal code of the company',
        example: '5612 MA',
        type: String,
    })
    postalCode: string;

    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The vat of the company',
        example: '12345678',
        type: String,
    })
    vat: string;

    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The description of the company',
        example: 'This is a company',
        type: String,
    })
    description: string;

    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        description: 'verification status of the company',
        example: true,
        type: Boolean,
    })
    verified: boolean;
}