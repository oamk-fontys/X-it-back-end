import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class FileDto {
  @Expose()
  @ApiProperty({
    description: 'file id',
    example: 'bf45e9a1-bfa5-409a-88fe-5fd3171f4594',
  })
  id: string;

  @Expose()
  @ApiProperty({
    description: 'file url',
    example: 'https://i.ibb.co/1234567890/logo.png',
  })
  url: string;

  @Expose()
  @ApiProperty({
    description: 'file mime type',
    example: 'image/jpeg',
  })
  mimeType: string;

  @Expose()
  @ApiProperty({
    description: 'file key',
    example: '1234567890',
  })
  key: string;

  @Expose()
  @ApiProperty({
    description: 'file created at',
    example: '2025-01-01',
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    description: 'file updated at',
    example: '2025-01-01',
  })
  updatedAt: Date;
}
