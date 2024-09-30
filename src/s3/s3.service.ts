import { Injectable } from '@nestjs/common';
import {
    S3Client,
    PutObjectCommand,
    PutObjectCommandInput,
    PutObjectCommandOutput 

} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {

    constructor(private configService: ConfigService){}

    private readonly s3Client = new S3Client({
        region: this.configService.getOrThrow('AWS_S3_REGION')
    })

    async uploadFile(file: Express.Multer.File, fileName: string): Promise<string>{
        await this.s3Client.send(
            new PutObjectCommand({
                Bucket: 'easyjob-bucket',
                Key: fileName,
                Body: file.buffer
            }),
        );
        
        const photoUrl = this.configService.getOrThrow('S3_URL') + "/" + fileName   

        return photoUrl;
    }
}
