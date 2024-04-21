import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { isUUID } from 'class-validator';
import { Speciality } from './entities/speciality.entity';
import { createSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';

@Injectable()
export class SpecialityService {


  private readonly logger = new Logger('SpecialityService');

  constructor(
    @InjectRepository(Speciality)
    private readonly specialityRepository: Repository<Speciality>
  ) {}

  async create(createSpecialityDto: createSpecialityDto) {
    const speciality =  this.specialityRepository.create(createSpecialityDto);

    await this.specialityRepository.save(speciality);

    return speciality;
  }

  findAll( paginationDto: PaginationDto ) {
    const {limit = 10, offset= 0} = paginationDto;

    return this.specialityRepository.find({
      take: limit, 
      skip: offset,
    })

  }

  async findOne(id_speciality: string) {

    let speciality: Speciality;

    if(isUUID(id_speciality)){
      speciality = await this.specialityRepository.findOneBy({id: id_speciality});
    }

    if(!speciality){
      throw new NotFoundException(`Speciality with ${id_speciality} not found`)
    }

    return speciality;
  }

  async update(id: string, updateSpecialityDto: UpdateSpecialityDto) {
    const speciality = await this.specialityRepository.preload({
      id: id,
      ...updateSpecialityDto
    });

    if ( !speciality ) throw new NotFoundException(`Speciality with id: ${ id } not found`);

    try {
      await this.specialityRepository.save( speciality );
      return speciality;
      
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const speciality = await this.findOne(id);
    await this.specialityRepository.remove(speciality);
  }

  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }

}
