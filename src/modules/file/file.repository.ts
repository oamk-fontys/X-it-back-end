import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';

const FILE_SERVICE_URL = 'https://api.imgbb.com/1';

interface ImageDetails {
  filename: string;
  name: string;
  mime: string;
  extension: string;
  url: string;
}

interface ImgBBResponse {
  data: {
    id: string;
    title: string;
    url_viewer: string;
    url: string;
    display_url: string;
    width: string;
    height: string;
    size: string;
    time: string;
    expiration: string;
    image: ImageDetails;
    thumb: ImageDetails;
    medium: ImageDetails;
    delete_url: string;
  };
  success: boolean;
  status: number;
}

@Injectable()
export class FileRepository {
  constructor(private readonly httpService: HttpService) {}

  async uploadFile(buffer: Buffer) {
    const formData = new FormData();
    formData.append('image', buffer.toString('base64'));

    const API_KEY = process.env.IMG_BB_API_KEY;

    if (!API_KEY) {
      throw new BadRequestException('IMG_BB_API_KEY is not set');
    }

    const { data, status } =
      await this.httpService.axiosRef.post<ImgBBResponse>(
        `${FILE_SERVICE_URL}/upload?key=${API_KEY}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

    if (status !== 200) {
      throw new BadRequestException('Failed to upload file');
    }

    return {
      url: data.data.image.url,
      key: data.data.image.filename,
      mimeType: data.data.image.mime,
    };
  }
}
