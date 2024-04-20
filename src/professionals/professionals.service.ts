import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Professional } from './entities/professional.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { isUUID } from 'class-validator';
import { Service } from './entities/service.entity';
import { ServiceService } from './service.service';

@Injectable()
export class ProfessionalsService {

  private readonly logger = new Logger('ProfessionalService');


  constructor(
    @InjectRepository(Professional)
    private readonly professionalRepository: Repository<Professional>,
    private readonly serviceService: ServiceService
  ) {}

  async create(createProfessionalDto: CreateProfessionalDto) {
    const professional =  this.professionalRepository.create(createProfessionalDto);

    await this.professionalRepository.save(professional);

    return professional;
  }

  findAll(paginationDto: PaginationDto) {
    const {limit = 10, offset= 0} = paginationDto;
    
    return this.professionalRepository.find({
      take: limit, 
      skip: offset
    });
  }

  async findOne(id_professional: string) {

    let professional: Professional;


    if(isUUID(id_professional)){
      professional = await this.professionalRepository.findOneBy({id: id_professional});
    }

    if(!professional){
      throw new NotFoundException(`Professional with ${id_professional} not found`)
    }

    return professional;

  }

  async addServiceToProfessional(id_professional: string, id_service: string ) {
    let professional: Professional;
    let service: Service;

    if(isUUID(id_professional) && isUUID(id_service)){
      professional = await this.findOne(id_professional);
      service =  await this.serviceService.findOne(id_service);
    }

    professional.services.push(service);

    return professional;
    
  }

  async update(id: string, updateProfessionalDto: UpdateProfessionalDto) {
    const professional = await this.professionalRepository.preload({
      id: id,
      ... updateProfessionalDto
    });

    if ( !professional ) throw new NotFoundException(`Professional with id: ${ id } not found`);

    try {
      await this.professionalRepository.save( professional );
      return professional;
      
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const professional = await this.findOne(id);
    await this.professionalRepository.remove(professional);
  }

  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
}
