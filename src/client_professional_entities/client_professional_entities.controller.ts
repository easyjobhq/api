import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientProfessionalEntitiesService } from './client_professional_entities.service';
import { CreateClientProfessionalEntityDto } from './dto/create-client_professional_entity.dto';
import { UpdateClientProfessionalEntityDto } from './dto/update-client_professional_entity.dto';

@Controller('client-professional-entities')
export class ClientProfessionalEntitiesController {
  constructor(private readonly clientProfessionalEntitiesService: ClientProfessionalEntitiesService) {}

  @Post()
  create(@Body() createClientProfessionalEntityDto: CreateClientProfessionalEntityDto) {
    return this.clientProfessionalEntitiesService.create(createClientProfessionalEntityDto);
  }

  @Get()
  findAll() {
    return this.clientProfessionalEntitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientProfessionalEntitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientProfessionalEntityDto: UpdateClientProfessionalEntityDto) {
    return this.clientProfessionalEntitiesService.update(+id, updateClientProfessionalEntityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientProfessionalEntitiesService.remove(+id);
  }
}
