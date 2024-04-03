import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GeneralResourcesService } from './general_resources.service';
import { CreateGeneralResourceDto } from './dto/create-general_resource.dto';
import { UpdateGeneralResourceDto } from './dto/update-general_resource.dto';

@Controller('general-resources')
export class GeneralResourcesController {
  constructor(private readonly generalResourcesService: GeneralResourcesService) {}

  @Post()
  create(@Body() createGeneralResourceDto: CreateGeneralResourceDto) {
    return this.generalResourcesService.create(createGeneralResourceDto);
  }

  @Get()
  findAll() {
    return this.generalResourcesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generalResourcesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGeneralResourceDto: UpdateGeneralResourceDto) {
    return this.generalResourcesService.update(+id, updateGeneralResourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.generalResourcesService.remove(+id);
  }
}
