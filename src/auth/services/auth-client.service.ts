import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { Client } from '../../clients/entities/client.entity';
import { LoginUserDto } from '../dto/login-user.dto';
import { CreateClientDto } from '../../clients/dto/create-client.dto';


@Injectable()
export class AuthClientService {
  constructor(
    @InjectRepository(Client)
    private readonly userRepository: Repository<Client>,
    private readonly jwtService: JwtService,

  ) {}

  

  async create( createUserDto: CreateClientDto) {
    
    try {

      const { password, ...userData } = createUserDto;
      
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync( password, 10 )

      });

      await this.userRepository.save( user )

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

    const { email, password } = loginUserDto;
    //console.log(loginUserDto)

    
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true } 
    });

    //console.log(user)


    if ( !user ) 
      throw new UnauthorizedException('Credentials are not valid (email)');
  
    
    
    if ( !bcrypt.compareSync( password, user.password ) )
      throw new UnauthorizedException('Credentials are not valid (password)');
    
    

    //console.log(user)
    return {
      ...user,
      token: this.jwtService.sign({ id: user.id })
    };
  }

  async isBcryptHash(hash: string): Promise<boolean> {
    // Verifica que la cadena comience con $2a$, $2b$, $2x$ o $2y$
    const bcryptPattern = /^\$2[abxy]\$\d{2}\$[./A-Za-z0-9]{53}$/;
    return bcryptPattern.test(hash);
  }

  async checkAuthStatus( user: Client ){

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
