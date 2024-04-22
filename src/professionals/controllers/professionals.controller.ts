import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ProfessionalsService } from '../professionals.service';
import { CreateProfessionalDto } from '../dto/create-professional.dto';
import {PaginationDto} from '../../common/dtos/pagination.dto'
import { UpdateProfessionalDto } from '../dto/update-professional.dto';

@Controller('professionals')
export class ProfessionalsController {
  constructor(private readonly professionalsService: ProfessionalsService,private readonly paginationDto: PaginationDto) {}

  @Post()
  create(@Body() createProfessionalDto: CreateProfessionalDto) {
    return this.professionalsService.create(createProfessionalDto);
  }

  @Get()
  findAll() {
    this.paginationDto.limit =10
    this.paginationDto.offset = 0 
    return this.professionalsService.findAll(this.paginationDto);
  }

  @Get(':id')
  findOne(@Param('name') name: string) {
    return this.professionalsService.findOne(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfessionalDto: UpdateProfessionalDto) {
    return this.professionalsService.update(id, updateProfessionalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professionalsService.remove(id);
  }

  @Post(':id_professional/:id_service')
  addService(@Param('id_professional') id_professional: string,@Param('id_service') id_service: string){
    return this.professionalsService.addServiceToProfessional(id_professional, id_service);
  }

  @HttpCode(200)
  @Post(':id_professional/:id_speciality')
  addSpeciality(@Param('id_professional') id_professional: string,@Param('id_speciality') id_speciality:string){
      return this.professionalsService.addSpecialityToProfessional(id_professional,id_speciality);
  }

}
