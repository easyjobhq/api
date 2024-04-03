import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { ProfessionalsModule } from './professionals/professionals.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralResourcesModule } from './general_resources/general_resources.module';
import { ClientProfessionalEntitiesModule } from './client_professional_entities/client_professional_entities.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: ['dist/**/*entity{.ts,.js}'],
      synchronize: true,
      retryDelay: 3000,
      retryAttempts: 10
    }),
    ClientsModule, 
    ProfessionalsModule, GeneralResourcesModule, ClientProfessionalEntitiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
