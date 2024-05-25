import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class ClientsService {


  private readonly logger = new Logger('ClientsService');

  constructor(
    @InjectRepository(Client)
    private readonly clientRespository: Repository<Client>
  ) {}

  async create(createClientDto: CreateClientDto) {
    const client =  this.clientRespository.create(createClientDto);

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
      client = await this.clientRespository.findOneBy({id: id_client});
    }

    if(!client){
      throw new NotFoundException(`Client with ${id_client} not found`)
    }

    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.clientRespository.preload({
      id: id,
      ...updateClientDto
    });

    if ( !client ) throw new NotFoundException(`Client with id: ${ id } not found`);

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
