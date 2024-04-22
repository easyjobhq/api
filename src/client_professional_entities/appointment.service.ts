import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Appointment } from './entities/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { isUUID } from 'class-validator';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ClientsService } from 'src/clients/clients.service';
import { ProfessionalsService } from 'src/professionals/professionals.service';

@Injectable()
export class AppointmentService {
  private readonly logger = new Logger('ServiceService');

  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly clientService: ClientsService, 
    private readonly professionalsService: ProfessionalsService
  ) {}

  async create(id_client: string, id_professional: string, createApointmentDto: CreateAppointmentDto) {
    
    const appointment =  this.appointmentRepository.create(createApointmentDto);

    const client = await this.clientService.findOne(id_client);

    const professional = await this.professionalsService.findOne(id_professional);

    appointment.client = client;
    appointment.professional = professional;
    
    await this.appointmentRepository.save(appointment);

    return appointment;
  }

  findAll( paginationDto: PaginationDto ) {
    const {limit = 10, offset= 0} = paginationDto;

    return this.appointmentRepository.find({
      take: limit, 
      skip: offset,
    })

  }

  async findOne(id_appointment: string) {

    let appointment: Appointment;

    if(isUUID(id_appointment)){
      appointment = await this.appointmentRepository.findOneBy({id: id_appointment});
    }

    if(!appointment){
      throw new NotFoundException(`Appointment with ${id_appointment} not found`)
    }

    return appointment;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.appointmentRepository.preload({
      id: id,
      ...updateAppointmentDto
    });

    if ( !appointment ) throw new NotFoundException(`Appointment with id: ${ id } not found`);

    try {
      await this.appointmentRepository.save( appointment );
      return appointment;
      
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const appointment = await this.findOne(id);
    await this.appointmentRepository.remove(appointment);
  }

  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
}
