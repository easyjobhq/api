import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { Professional } from '../../professionals/entities/professional.entity';
import { LoginUserDto } from '../dto/login-user.dto';
import { CreateProfessionalDto } from '../../professionals/dto/create-professional.dto';
import { ProfessionalsService } from '../../professionals/professionals.service';


@Injectable()
export class AuthProfessionalService {
  constructor(
    @InjectRepository(Professional)
    private readonly userRepository: Repository<Professional>,
    private readonly jwtService: JwtService,
    private readonly professionalService: ProfessionalsService,

  ) {}

  async create( createUserDto: CreateProfessionalDto) {
    
    try {

      const { password, ...userData } = createUserDto;

      createUserDto.password = bcrypt.hashSync(createUserDto.password, 10);

      const user = await this.professionalService.create(createUserDto);
      
      //const user = this.userRepository.create({
        //...userData,
        //password: bcrypt.hashSync( password, 10 )
      //});

      //await this.userRepository.save( user )

      return {
        ...user,
        token: this.jwtService.sign({ id: user.id })
      };
      // TODO: Retornar el JWT de acceso

    } catch (error) {
      this.handleDBErrors(error);
    }

  }

  async login( loginUserDto: LoginUserDto ) {

    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true } 
    });

    if ( !user ) 
      throw new UnauthorizedException('Credentials are not valid (email)');
      
    if ( !bcrypt.compareSync( password, user.password ) )
      throw new UnauthorizedException('Credentials are not valid (password)');

    return {
      ...user,
      token: this.jwtService.sign({ id: user.id })
    };
  }

  async checkAuthStatus( user: Professional ){

     return {
       ...user,
       token: this.jwtService.sign({ id: user.id })
     };

  }

  private handleDBErrors( error: any ): never {


    if ( error.code === '23505' ) 
      throw new BadRequestException( error.detail );

    console.log(error)

    throw new InternalServerErrorException('Please check server logs');

  }

}
