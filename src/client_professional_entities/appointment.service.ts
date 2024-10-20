import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Appointment } from './entities/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { isUUID } from 'class-validator';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ClientsService } from '../clients/clients.service';
import { ProfessionalsService } from '../professionals/professionals.service';
import { PaymentMethodService } from '../general_resources/services/paymentMethod.service';
import { CreatePaymentMethodDto } from '../general_resources/dto/create-paymentMethod';


@Injectable()
export class AppointmentService {
  private readonly logger = new Logger('ServiceService');

  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly clientService: ClientsService, 
    private readonly professionalsService: ProfessionalsService,
    private readonly paymentMethodService: PaymentMethodService,
  ) {}

  async create(clientId: string, professionalId: string, payment_method_name: string, createAppointmentDto: CreateAppointmentDto) {

      const client = await this.clientService.findOne(clientId);
      const professional = await this.professionalsService.findOne(professionalId);
      //const paymentMethod = await this.paymentMethodService.findOneByName(payment_method_name);

      if (!client || !professional) {
        throw new NotFoundException('Cliente, profesional o método de pago no encontrado');
    }

      createAppointmentDto.client = client;
      createAppointmentDto.professional = professional;
      //createAppointmentDto.paymentMethod = paymentMethod;
    
      const appointment = this.appointmentRepository.create(createAppointmentDto);
      //console.log(appointment)
      await this.appointmentRepository.save(appointment);

      //transoforma createappointmentdto.date a tipo date

      let dateString = createAppointmentDto.date;

      //console.log(dateString);

      // Elimina comillas al principio y al final si existen
      if (dateString.startsWith('"') && dateString.endsWith('"')) {
        dateString = dateString.slice(1, -1);
      }

      const date = new Date(dateString);

      const date1 = date.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
      const time = date.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      const brevo = require('@getbrevo/brevo');
      
      const apiInstance = new brevo.TransactionalEmailsApi();

      apiInstance.setApiKey(
        brevo.TransactionalEmailsApiApiKeys.apiKey,
        `${process.env.BREVO_API_KEY}`
      );

      const sendSmtpEmail =  new brevo.SendSmtpEmail();

      sendSmtpEmail.subject = `{{params.subject}}`;

      sendSmtpEmail.htmlContent = `
                                    <html>
                                    <head>
                                      <style>
                                        body {
                                          font-family: Arial, sans-serif;
                                          background-color: #f4f4f4;
                                          margin: 0;
                                          padding: 0;
                                        }
                                        .container {
                                          background-color: #ffffff;
                                          margin: 50px auto;
                                          padding: 20px;
                                          border-radius: 10px;
                                          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                          max-width: 600px;
                                        }
                                        .header {
                                          background-color: #4CAF50;
                                          color: white;
                                          padding: 10px 0;
                                          text-align: center;
                                          border-radius: 10px 10px 0 0;
                                        }
                                        .content {
                                          padding: 20px;
                                          text-align: center;
                                        }
                                        .footer {
                                          background-color: #f4f4f4;
                                          color: #888;
                                          padding: 10px;
                                          text-align: center;
                                          border-radius: 0 0 10px 10px;
                                        }
                                        .button {
                                          background-color: #4CAF50;
                                          color: white;
                                          padding: 10px 20px;
                                          text-decoration: none;
                                          border-radius: 5px;
                                          display: inline-block;
                                          margin-top: 20px;
                                        }
                                      </style>
                                    </head>
                                    <body>
                                      <div class="container">
                                        <div class="header">
                                          <h1>¡Cita Agendada!</h1>
                                        </div>
                                        <div class="content">
                                          <h2>Hola ${client.name},</h2>
                                          <p>Se ha agendado una cita con el profesional <strong>${professional.name}</strong> para el día <strong>${date1}</strong> a las <strong>${time}</strong>.</p>
                                          <p>El método de pago seleccionado es <strong>Efectivo</strong>.</p>
                                          <a href="#" class="button">Ver Detalles</a>
                                        </div>
                                        <div class="footer">
                                          <p>¡Te esperamos!</p>
                                          <p>EasyJob</p>
                                        </div>
                                      </div>
                                    </body>
                                    </html>
                                    `;

      sendSmtpEmail.sender = {"name":"EasyJob", "email": "no-reply@easyjob.com.co"}

      sendSmtpEmail.to = [{"email": `${client.email}`, "name": `${client.name}`}];

      sendSmtpEmail.replyTo = {"email": `${client.email}`, "name": `${client.name}`}

      sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
      sendSmtpEmail.params = { "parameter": "My param value", "subject": "Pedido agendado" };

      await apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
        //console.log('API called successfully. Returned data: ' + JSON.stringify(data));
      }, function (error) {
          console.log(error);
      });


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
