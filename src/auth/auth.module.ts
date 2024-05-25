import { Module } from '@nestjs/common';
import { AuthClientService } from './services/auth-client.service'
import { AuthProfessionalService } from './services/auth-professional.service';
import { AuthClientController } from './controller/auth-client.controller';
import { AuthProfessionalController } from './controller/auth-professional.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from '../clients/entities/client.entity';
import { Professional } from '../professionals/entities/professional.entity';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuard } from './guards/user/user.guard';
import { APP_GUARD } from '@nestjs/core';
import { ProfessionalsService } from '../professionals/professionals.service';
//import { JwtProfessionalStrategy } from './strategies/jwt-professional.strategy';

@Module({
  controllers: [AuthClientController, AuthProfessionalController],
  providers: [AuthClientService, AuthProfessionalService, JwtStrategy,RolesGuard, ProfessionalsService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Client]),
    TypeOrmModule.forFeature([Professional]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: ( configService: ConfigService ) => ({
          secret: configService.get('JWT_SECRET') || 'secret',
          signOptions: {expiresIn:'2h'}
      })
    })
  ],
  exports: [TypeOrmModule, AuthModule]
})
export class AuthModule {}
