import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

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
        description: 'The id of the owner',
        example: '241afd74-f7e1-4f37-a4a9-ffd4d68e7b0a',
        type: String,
    })
    ownerId: string;

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