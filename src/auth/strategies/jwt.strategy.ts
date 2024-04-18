import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { Client } from '../../clients/entities/client.entity';
import { Professional } from '../../professionals/entities/professional.entity';

import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

    constructor(
        @InjectRepository(Client)
        private readonly userClientRepository: Repository<Client>,
        @InjectRepository(Professional)
        private readonly userProfessionalRepository: Repository<Professional>,
        
    
        configService: ConfigService
      ) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: configService.get('JWT_SECRET') || 'secret',
        });
      }


    async validate( payload: JwtPayload ) {
        
        const id: string = payload.id;

        //console.log(id)

        const user = await this.userClientRepository.findOneBy({ id });

        if ( !user ) {
            const user = await this.userProfessionalRepository.findOneBy({ id });
            if(!user)
                throw new UnauthorizedException('Token not valid')
            return user
        }
            
            
        

        return user;
    }

}