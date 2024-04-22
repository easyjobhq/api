import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { SpecialityService } from '../speciality.service'
import { createSpecialityDto } from '../dto/create-speciality.dto';
import { UpdateSpecialityDto } from '../dto/update-speciality.dto';

@Controller('professionals')
export class ProfessionalsController {
  constructor(private readonly SpecialityService: SpecialityService) {}

  @Post()
  create(@Body() createSpecialityDto: createSpecialityDto) {
    return this.SpecialityService.create(createSpecialityDto);
  }

  @Get()
  findAll() {
    //return this.professionalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('name') name: string) {
    return this.SpecialityService.findOne(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpecialityDto: UpdateSpecialityDto) {
    return this.SpecialityService.update(id, updateSpecialityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.SpecialityService.remove(id);
  }

}
