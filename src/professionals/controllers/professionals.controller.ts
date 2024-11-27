import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProfessionalsService } from '../professionals.service';
import { CreateProfessionalDto } from '../dto/create-professional.dto';
import {PaginationDto} from '../../common/dtos/pagination.dto'
import { UpdateProfessionalDto } from '../dto/update-professional.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {Roles} from "../../auth/decorators/roles.decorator";
import {Role} from "../../auth/entities/role.enum";
import { RolesGuard } from '../../auth/guards/user/user.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('professionals')
export class ProfessionalsController {
  constructor(private readonly professionalsService: ProfessionalsService) {}

  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('professional_image'))
  @Post()
  create(
    @Body() createProfessionalDto: CreateProfessionalDto,
    @UploadedFile() professionalPhoto: Express.Multer.File
  ) {
    return this.professionalsService.create(createProfessionalDto, professionalPhoto);
  }


  //@UseGuards(AuthGuard())
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const [results, total] = await this.professionalsService.findAll(limit, (page - 1) * limit);
    return {
      data: results,
      total,
    };
  }

  @Get('city/:city/speciality/:speciality')
  async findByCityAndSpecialty( 
    @Param('city') city: string, 
    @Param('speciality') speciality: string,
    @Query('page') page:number = 1, 
    @Query('limit') limit: number= 10
  ) {
    const [results, total] = await this.professionalsService.findByCityAndSpeciality(city, speciality, limit, (page - 1) * limit);
    
    return {
      data: results,
      total,
    };
  }

  //@UseGuards(AuthGuard())
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professionalsService.findOne(id);
  }

  //@UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('professional_image'))
  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateProfessionalDto: UpdateProfessionalDto,
    @UploadedFile() professionalPhoto: Express.Multer.File
  ) {
    return this.professionalsService.update(id, updateProfessionalDto, professionalPhoto);
  }


  @UseGuards(AuthGuard())
  @Roles(Role.Professional)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professionalsService.remove(id);
  }


  @Get('service/:id_professional/:id_service')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.Professional)
  addService(@Param('id_professional') id_professional: string,@Param('id_service') id_service: string){
    return this.professionalsService.addServiceToProfessional(id_professional, id_service);
  }

  @UseGuards(AuthGuard())
  @HttpCode(200)
  @Roles(Role.Professional)
  @Get('specialities/:id_professional/:id_speciality')
  addSpeciality(@Param('id_professional') id_professional: string,@Param('id_speciality') id_speciality:string){
      return this.professionalsService.addSpecialityToProfessional(id_professional,id_speciality);
  }

  @Get('speciality/:speciality_name')
  findProfessionalsByService(@Param('speciality_name') speciality_name: string){
    return this.professionalsService.findProfessionalsBySpeciality(speciality_name);
  }


  @Roles(Role.Professional)
  @Post('city/:id_city/professional/:id_professional')
  addCities(@Param('id_professional') id_professional:string, @Param('id_city') id_city:string ){
    return this.professionalsService.addCityToProfessional(id_professional,id_city);
  }


  //@UseGuards(AuthGuard())
  @Get('services/:id_professional')
  findServices(@Param('id_professional') id_professional: string){
    return this.professionalsService.findServices(id_professional)
  }

  //@UseGuards(AuthGuard())
  @Get('specialities/:id_professional')
  findSpeciality(@Param('id_professional') id_professional: string){
    return this.professionalsService.findSpecialities(id_professional);
  }

  @UseGuards(AuthGuard())
  @Get('city/:city_name')
  findByCity(@Param('city_name') city_name: string){
    return this.professionalsService.findByCity(city_name);
  }

  //@UseGuards(AuthGuard())
  @Get('cities/:id_professional')
  findCities(@Param('id_professional') id_professional:string){
    return this.professionalsService.findCities(id_professional);
  }

  //@UseGuards(AuthGuard())
  @Get('appointments/:id_professional')
  findAppoiments(@Param('id_professional') id_professional:string){
    return this.professionalsService.findAppoiments(id_professional);
  }


  //@UseGuards(AuthGuard(), RolesGuard)
  //@Roles(Role.Professional)
  @Delete('oneservice/:id_professional/:id_service')
  deleteServiceToProfessional(@Param('id_professional') id_professional:string, @Param('id_service') id_service:string){
    return this.professionalsService.DeleteServiceToProfessional(id_professional, id_service)
  } 

  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.Professional)
  @Delete('onespeaciality/:id_professional/:id_speciality')
  deleteSpecialityToProfessional(@Param('id_professional') id_professional:string, @Param('id_speciality') id_speciality:string){
    return this.professionalsService.DeleteSpecialityToProfessional(id_professional, id_speciality)
  
  }

  @Get('totalreviews/:id_professional')
  totalReviews(@Param('id_professional') id_professional:string){
    return this.professionalsService.getTotalReviews(id_professional);
  }

}
