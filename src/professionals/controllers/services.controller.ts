import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards} from '@nestjs/common';
import { ServiceService } from '../service.service'
import { CreateServiceDto } from '../dto/create-service.dto'
import { UpdateServiceDto } from '../dto/update-service.dto'
import {PaginationDto} from '../../common/dtos/pagination.dto'
import { AuthGuard } from '@nestjs/passport';
import {Roles} from "../../auth/decorators/roles.decorator";
import {Role} from "../../auth/entities/role.enum";


@Controller('services')
export class ServiceController {
  constructor(private readonly ServiceService: ServiceService,
  ) {}

  //@UseGuards(AuthGuard())
  @Post()
  @Roles(Role.Admin)
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.ServiceService.create(createServiceDto);
  }

  @Get()
  //@UseGuards(AuthGuard())
  findAll() {
    return this.ServiceService.findAll(10,0);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.ServiceService.findOne(id);
  }

  @UseGuards(AuthGuard())
  @Get('title/:title')
  findByTitle(@Param('title') title:string){
    return this.ServiceService.findByTitle(title);
  }

  @UseGuards(AuthGuard())
  @Get('price/:price')
  findByPrice(@Param('price') price: number){
    return this.ServiceService.findByPrice(price)
  }

  @Get('city/:city_name')
  @UseGuards(AuthGuard())
  findByCity(@Param('city_name') city_name: string){
    return this.ServiceService.findByCity(city_name)
  }

  @UseGuards(AuthGuard())
  @Get('department/:department_name')
  findByDeparment(@Param('department_name') department_name: string){
    return this.ServiceService.findByDeparment(department_name)
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  //@Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateServicelDto: UpdateServiceDto) {
    return this.ServiceService.update(id, updateServicelDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  //@Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.ServiceService.remove(id);
  }

}
