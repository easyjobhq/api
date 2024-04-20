import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { isUUID } from 'class-validator';
import { Service } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {


  private readonly logger = new Logger('ServiceService');

  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    const service =  this.serviceRepository.create(createServiceDto);

    await this.serviceRepository.save(service);

    return service;
  }

  findAll( paginationDto: PaginationDto ) {
    const {limit = 10, offset= 0} = paginationDto;

    return this.serviceRepository.find({
      take: limit, 
      skip: offset,
    })

  }

  async findOne(id_service: string) {

    let service: Service;

    if(isUUID(id_service)){
      service = await this.serviceRepository.findOneBy({id: id_service});
    }

    if(!service){
      throw new NotFoundException(`Service with ${id_service} not found`)
    }

    return service;
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    const service = await this.serviceRepository.preload({
      id: id,
      ...updateServiceDto
    });

    if ( !service ) throw new NotFoundException(`Service with id: ${ id } not found`);

    try {
      await this.serviceRepository.save( service );
      return service;
      
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const service = await this.findOne(id);
    await this.serviceRepository.remove(service);
  }

  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }

}
