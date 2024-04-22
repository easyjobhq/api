import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import {QuestionService} from '../question.service'
import {CreateQuestionDto} from '../dto/create-question.dto'
import {PaginationDto} from '../../common/dtos/pagination.dto'
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/user/user.guard';
import { Role } from '../../auth/entities/role.enum';
import { Roles } from '../../auth/decorators/roles.decorator';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService,
              private readonly paginationDto: PaginationDto
  ) {}

  @UseGuards(AuthGuard(),RolesGuard)
  @Roles(Role.Client)
  @Post(':client_id/:professional_id')
  create(@Body() createQuestionDto: CreateQuestionDto, @Param('client_id') client_id: string, @Param('professional_id') professional_id: string ) {
    return this.questionService.create(client_id,professional_id,createQuestionDto);
  }

   
  @UseGuards(AuthGuard())
  @Get()
  findAll() {
    this.paginationDto.limit = 10
    this.paginationDto.offset = 0
     return this.questionService.findAll(this.paginationDto);
  }

  @UseGuards(AuthGuard())
  @Get(':id')
  findOne(@Param('id') id: string) {
     return this.questionService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateClientProfessionalEntityDto: UpdateClientProfessionalEntityDto) {
  //   return this.clientProfessionalEntitiesService.update(+id, updateClientProfessionalEntityDto);
  // }

  @UseGuards(AuthGuard(),RolesGuard)
  @Roles(Role.Client)
   @Delete(':id')
      remove(@Param('id') id: string) {
     return this.questionService.remove(id);
   }
}
