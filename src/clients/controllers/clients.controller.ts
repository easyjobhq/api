import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { ClientsService } from '../clients.service';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @UseInterceptors(FileInterceptor('client_image'))
  @Post()
  create(
    @Body() createClientDto: CreateClientDto,
    @UploadedFile() professionalPhoto: Express.Multer.File
  ) {
    return this.clientsService.create(createClientDto, professionalPhoto);
  }

  @Get()
  findAll(@Query() paginationDto:PaginationDto) {
    return this.clientsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('client_image'))
  //@UseGuards(AuthGuard())
  update(@Param('id') id: string,@UploadedFile() clientPhoto: Express.Multer.File, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto, clientPhoto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  }
}
