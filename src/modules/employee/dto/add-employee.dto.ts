import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';

@Exclude()
export class AddEmployeeDto {
  @Expose()
  @ApiProperty({
    description: 'The ID of the user to add as an employee',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
