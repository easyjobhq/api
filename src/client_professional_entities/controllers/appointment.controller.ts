import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import {QuestionService} from '../question.service'
import {CreateQuestionDto} from '../dto/create-question.dto'
import {PaginationDto} from '../../common/dtos/pagination.dto'
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/user/user.guard';
import { Role } from '../../auth/entities/role.enum';
import { Roles } from '../../auth/decorators/roles.decorator';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { AppointmentService } from '../appointment.service';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService
  ) {}

  @Post(':client_id/:professional_id')
  create(@Body() createAppointmentDto: CreateAppointmentDto, @Param('client_id') client_id: string, @Param('professional_id') professional_id: string) { 
   return this.appointmentService.create(client_id,professional_id, createAppointmentDto);
  }

  @Get('client/:client_id')
  findAppointmentByClient(@Param('client_id') client_id: string) {
     return this.appointmentService.findAppointmentByClient(client_id);
  }

  @Get('professional/:professional_id')
  findAppointmentByProfessional(@Param('professional_id') professional_id: string) {
     return this.appointmentService.findAppointmentByProfessional(professional_id);
  }

  @Patch('status/:appointment_id/:status_name')
   updateStatus(@Param('appointment_id') appointment_id: string, @Param('status_name') status_name: string) {
       return this.appointmentService.updateStatus(appointment_id, status_name);
   }

   
  //@UseGuards(AuthGuard())
  @Get()
  findAll() {
     return this.appointmentService.findAll({limit: 10, offset: 0});
  }

  //@UseGuards(AuthGuard())
  @Get(':id')
  findOne(@Param('id') id: string) {
     return this.appointmentService.findOne(id);
  }

   @UseGuards(AuthGuard(),RolesGuard)
   @Roles(Role.Client, Role.Professional)
   @Delete(':id')
      remove(@Param('id') id: string) {
     return this.appointmentService.remove(id);
   }
}
