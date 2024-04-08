import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { User } from './entities/user.entity';
import { Question } from 'src/client_professional_entities/entities/question.entitiy';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  imports: [
    TypeOrmModule.forFeature([Client]), 
    TypeOrmModule.forFeature([User])
  ]
})
export class ClientsModule {}
