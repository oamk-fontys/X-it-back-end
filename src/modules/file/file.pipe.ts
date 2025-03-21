import { BadRequestException, PipeTransform } from '@nestjs/common';

import { ArgumentMetadata } from '@nestjs/common';

import { Injectable } from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  constructor(private readonly maxSize: number) {}

  transform(value: any, metadata: ArgumentMetadata) {
    // Check if file is an image by validating mimetype
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
    ];

    if (!value) {
      throw new BadRequestException('File not found');
    }

    if (!allowedMimeTypes.includes(value.mimetype)) {
      throw new BadRequestException('Only image files are allowed');
    }

    // Validate file size
    const oneKb = 2 * 1024 * 1024; // 2MB in bytes
    if (value.size >= oneKb) {
      throw new BadRequestException('File size exceeds maximum allowed size');
    }

    return value;
  }
}
