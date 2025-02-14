import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

@Exclude()
export class CreateEditPetDto {

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the pet',
    example: 'Max',
    type: String,
  })
  name: string;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The age of the pet in years',
    example: 3,
    type: Number,
  })
  age: number;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The breed of the pet',
    example: 'Golden Retriever',
    type: String,
  })
  breed: string;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The species of the pet',
    example: 'Dog',
    type: String,
  })
  species: string;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The gender of the pet',
    example: 'Male',
    type: String,
  })
  gender: string;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The color of the pet',
    example: 'Golden',
    type: String,
  })
  color: string;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The size of the pet',
    example: 'Medium',
    type: String,
  })
  size: string;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The weight of the pet in kilograms',
    example: 25,
    type: Number,
  })
  weight: number;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The URL of the pet\'s image',
    example: 'https://example.com/pet-image.jpg',
    type: String,
  })
  image: string;

  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'A description of the pet',
    example: 'Friendly and energetic Golden Retriever who loves to play fetch.',
    type: String,
  })
  description: string;

  @Expose()
  @ApiProperty({
    description: 'The ID of the user who owns the pet',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  userId?: string;
}