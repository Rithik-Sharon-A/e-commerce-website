import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class CloudinaryService implements OnModuleInit {
    private readonly configService;
    constructor(configService: ConfigService);
    onModuleInit(): void;
    uploadBuffer(buffer: Buffer): Promise<string>;
    uploadFiles(files: {
        fieldname: string;
        buffer: Buffer;
    }[], fieldNames: string[]): Promise<string[]>;
}
