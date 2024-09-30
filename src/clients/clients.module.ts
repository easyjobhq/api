import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './controllers/clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { User } from '../auth/entities/user.entity';
import { Question } from '../client_professional_entities/entities/question.entitiy';
import { Review } from '../client_professional_entities/entities/review.entity';
import { DataSource } from 'typeorm';
import { S3Service } from 'src/s3/s3.service';
import { S3Module } from 'src/s3/s3.module';


@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  imports: [
    TypeOrmModule.forFeature([Client]), 
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Question]),
    TypeOrmModule.forFeature([Review]),
    S3Module
  ],
  exports: [ClientsModule, ClientsService]
})
export class ClientsModule {}
