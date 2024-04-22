import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards} from '@nestjs/common';
import { ServiceService } from '../service.service'
import { CreateServiceDto } from '../dto/create-service.dto'
import { UpdateServiceDto } from '../dto/update-service.dto'
import {PaginationDto} from '../../common/dtos/pagination.dto'
import { AuthGuard } from '@nestjs/passport';


@Controller('professionals')
export class ProfessionalsController {
  constructor(private readonly ServiceService: ServiceService,
              private readonly paginationDto: PaginationDto
  ) {}

  @UseGuards(AuthGuard())
  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.ServiceService.create(createServiceDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll() {
    this.paginationDto.limit =10
    this.paginationDto.offset = 0 
    return this.ServiceService.findAll(this.paginationDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('name') name: string) {
    return this.ServiceService.findOne(name);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(@Param('id') id: string, @Body() updateServicelDto: UpdateServiceDto) {
    return this.ServiceService.update(id, updateServicelDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.ServiceService.remove(id);
  }

}
