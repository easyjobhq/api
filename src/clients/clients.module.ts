import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './controllers/clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { User } from '../auth/entities/user.entity';
import { Question } from 'src/client_professional_entities/entities/question.entitiy';
import { Review } from 'src/client_professional_entities/entities/review.entity';


@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  imports: [
    TypeOrmModule.forFeature([Client]), 
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Question]),
    TypeOrmModule.forFeature([Review])
  ],
  exports: [ClientsModule]
})
export class ClientsModule {}
