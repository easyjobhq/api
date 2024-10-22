import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { isUUID } from 'class-validator';
import { S3Service } from 'src/s3/s3.service';
import { Express } from 'express';

@Injectable()
export class ClientsService {

  private readonly logger = new Logger('ClientsService');

  constructor(
    @InjectRepository(Client)
    private readonly clientRespository: Repository<Client>,
    private readonly s3Service: S3Service
  ) {}

  async create(createClientDto: CreateClientDto, professionalPhoto: Express.Multer.File) {

    try {
      //Uploading the file to S3
      
      const photoUrl = await this.s3Service.uploadFile(professionalPhoto, professionalPhoto.originalname);

      const client = this.clientRespository.create(createClientDto);
      
      client.photo_url = photoUrl;

      await this.clientRespository.save(client);

      return client;
      
    }catch(error) {
      console.log(error)
    }

    
  }

  async createWithPhotoUrl(createClientDto: CreateClientDto){

    const client = this.clientRespository.create(createClientDto);

    await this.clientRespository.save(client);

    return client;
  }
  

  findAll( paginationDto: PaginationDto ) {
    const {limit = 10, offset= 0} = paginationDto;

    return this.clientRespository.find({
      take: limit, 
      skip: offset,
    })

  }

  async findOne(id_client: string) {

    let client: Client;

    if(isUUID(id_client)){
      client = await this.clientRespository.findOne(
        {
          where: {id: id_client},
          relations: ['appointments', 'questions', 'reviews', 'reviews.professional', 'appointments.professional']
        },
      );
    }

    if(!client){
      throw new NotFoundException(`Client with ${id_client} not found`)
    }

    return client;
  }

  async findOneByEmail( email_client: string ): Promise<Client>{
    let client: Client;
    client = await this.clientRespository.findOneBy({email: email_client})
    return client;

  }

  async update(id: string, updateClientDto: UpdateClientDto, clientPhoto: Express.Multer.File) {
    const client = await this.clientRespository.preload({
      id: id,
      ...updateClientDto
    });

    if ( !client ) throw new NotFoundException(`Client with id: ${ id } not found`);

    if ( clientPhoto ) {
      const photoUrl = await this.s3Service.uploadFile(clientPhoto, clientPhoto.originalname);
      client.photo_url = photoUrl;
    }

    try {
      await this.clientRespository.save( client );
      return client;
      
    } catch (error) {
      this.handleDBExceptions(error);
    } 
  }

  async remove(id: string) {
    const client = await this.findOne(id);
    await this.clientRespository.remove(client);
  }

  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }

}
