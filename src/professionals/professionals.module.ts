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
import { Appointment } from '../client_professional_entities/entities/appointment.entity';
import { ProfessionalsController } from './controllers/professionals.controller';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { Client } from '../clients/entities/client.entity';
import { ServiceController } from './controllers/services.controller';
import { SpecialityController } from './controllers/specialities.controller';
import { LanguageService } from '../general_resources/services/language.service';
import { CityService } from '../general_resources/services/city.service';
import { GeneralResourcesModule } from '../general_resources/general_resources.module';
import { RolesGuard } from '../auth/guards/user/user.guard';
import { AppointmentController } from '../client_professional_entities/controllers/appointment.controller';
import { ClientsService } from '../clients/clients.service';
import { S3Module } from 'src/s3/s3.module';
import { ChatModule } from 'src/chat/chat.module';
import { AppointmentService } from 'src/client_professional_entities/appointment.service';
import { Place } from 'src/professionals/entities/place.entity';
import { PlacesService } from './places.service';
import { PlacesController } from './controllers/place.controller';

@Module({
  controllers: [
    ProfessionalsController, 
    ServiceController, 
    SpecialityController, 
    AppointmentController, 
    PlacesController
  ],
  providers: [
    ProfessionalsService, 
    ServiceService, 
    SpecialityService, 
    JwtStrategy, 
    LanguageService, 
    CityService, 
    RolesGuard,
    AppointmentService, 
    ClientsService, 
    PlacesService
  ],
  imports: [
    TypeOrmModule.forFeature([
      Professional, 
      Service, 
      Speciality, 
      Question, 
      Review, 
      Language, 
      City, 
      Appointment, 
      Client, 
      Place
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET') || 'secret',
        signOptions: { expiresIn: '20h' }
      })
    }),
    S3Module,
    PaginationDto,
    ConfigModule,
    GeneralResourcesModule
  ],
  exports: [
    ProfessionalsModule, 
    ProfessionalsService, 
    ServiceService, 
    SpecialityService
  ]
})
export class ProfessionalsModule {}
