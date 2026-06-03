import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_SECRET_KEY'),
    });
  }

  uploadBuffer(buffer: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'image' },
        (error, result) => {
          if (error || !result) {
            reject(error ?? new Error('Cloudinary upload failed'));
            return;
          }
          resolve(result.secure_url);
        },
      );
      Readable.from(buffer).pipe(uploadStream);
    });
  }

  async uploadFiles(
    files: { fieldname: string; buffer: Buffer }[],
    fieldNames: string[],
  ): Promise<string[]> {
    const images = files.filter((file) => fieldNames.includes(file.fieldname));
    return Promise.all(images.map((file) => this.uploadBuffer(file.buffer)));
  }
}
