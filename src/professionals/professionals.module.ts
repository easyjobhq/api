import { Module } from '@nestjs/common';
import { ProfessionalsService } from './professionals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professional } from './entities/professional.entity';
import { Service } from './entities/service.entity';
import { Speciality } from './entities/speciality.entity';
import { Question } from '../client_professional_entities/entities/question.entitiy';
import { Review } from '../client_professional_entities/entities/review.entity';
import { Language } from '../general_resources/entities/language.entity';
import { City } from '../general_resources/entities/city.entity';
import { ServiceService } from './service.service';
import { SpecialityService } from './speciality.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { Appointment } from 'src/client_professional_entities/entities/appointment.entity';
import { ProfessionalsController } from './controllers/professionals.controller';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { Client } from '../clients/entities/client.entity';
import { ServiceController } from './controllers/services.controller';
import { SpecialityController } from './controllers/specialities.controller';

@Module({
  controllers: [ProfessionalsController, ServiceController, SpecialityController],
  providers: [ProfessionalsService, ServiceService, SpecialityService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([Professional]),
    TypeOrmModule.forFeature([Service]), 
    TypeOrmModule.forFeature([Speciality]),
    TypeOrmModule.forFeature([Question]),
    TypeOrmModule.forFeature([Review]),
    TypeOrmModule.forFeature([Language]),
    TypeOrmModule.forFeature([City]), 
    TypeOrmModule.forFeature([Appointment]),
    TypeOrmModule.forFeature([Client]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: ( configService: ConfigService ) => ({
          secret: configService.get('JWT_SECRET') || 'secret',
          signOptions: {expiresIn:'2h'}
      })
    }),
    PaginationDto,
    ConfigModule
  ], 
  exports: [ProfessionalsModule]
})
export class ProfessionalsModule {}
