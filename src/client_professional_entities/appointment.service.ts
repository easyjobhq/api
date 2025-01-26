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
import { AppointmentStatus } from './entities/appointmentStatus.entity';
import { AppointmentStatusEnum } from './entities/appointment.status.enum';


@Injectable()
export class AppointmentService {
  private readonly logger = new Logger('ServiceService');

  constructor(
    @InjectRepository(AppointmentStatus)
    private readonly appointmentStatusRepository: Repository<AppointmentStatus>,
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly clientService: ClientsService,
    private readonly professionalsService: ProfessionalsService,

  ) { }

  async create(clientId: string, professionalId: string, createAppointmentDto: CreateAppointmentDto) {

      const client = await this.clientService.findOne(clientId);
      const professional = await this.professionalsService.findOne(professionalId);
      const appointmentStatus = await this.appointmentStatusRepository.findOne({where: {status: AppointmentStatusEnum.pending}});
      
      if (!client || !professional) {
        throw new NotFoundException('Cliente, profesional o método de pago no encontrado');
    }

    createAppointmentDto.client = client;
    createAppointmentDto.professional = professional;

    const appointment = this.appointmentRepository.create({
      ...createAppointmentDto,
      appointmentStatus
    });

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
    //const time = date.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const brevo = require('@getbrevo/brevo');

    const apiInstance = new brevo.TransactionalEmailsApi();

    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      `${process.env.BREVO_API_KEY}`
    );

    const sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.subject = `{{params.subject}}`;

    sendSmtpEmail.htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Petición de Cita Agendada</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f7f7f7;
      margin: 0;
      padding: 20px;
    }
    .container {
      background-color: #ffffff;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      max-width: 600px;
      margin: 0 auto;
    }
    .header {
      background-color: #3B82F6;
      color: white;
      text-align: center;
      padding: 20px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
    .header img {
      width: 150px;
    }
    .header h1 {
      margin: 10px 0 0 0;
      font-size: 24px;
    }
    .content {
      font-size: 16px;
      line-height: 1.5;
      color: #333333;
      padding: 20px;
      text-align: left;
    }
    .content h2 {
      font-size: 20px;
      color: #3B82F6;
      margin-bottom: 20px;
    }
    .content p {
      margin: 10px 0;
    }
    .content .info {
      background-color: #f0f8ff;
      padding: 15px;
      border-radius: 5px;
      margin-top: 20px;
    }
    .content .info p {
      margin: 5px 0;
    }
    .content .button-container {
      text-align: center;
      margin-top: 20px;
    }
    .content .button {
      background-color: #3B82F6;
      color: white;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 5px;
      display: inline-block;
      font-size: 16px;
    }
    .footer {
      background-color: #3B82F6;
      color: white;
      text-align: center;
      padding: 20px;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      margin-top: 30px;
    }
    .footer p {
      margin: 5px 0;
    }
    .footer a {
      color: white;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://easyjob-bucket.s3.us-east-2.amazonaws.com/imagotipo-vertical-blanco.png" alt="EasyJob Logo">
      <h1>¡Petición de Cita Agendada!</h1>
    </div>
    <div class="content">
      <h2>Hola, ${client.name}</h2>
      <p>Se ha realizado la petición de cita exitosamente. Aquí tienes los detalles:</p>
      <div class="info">
        <p><strong>👨‍⚕️ Profesional:</strong> ${professional.name}</p>
        <p><strong>📅 Fecha:</strong> ${date1}</p>
        <p><strong>⏰ Hora:</strong> ${createAppointmentDto.hour}</p>
      </div>
      <p>
        Próximamente, el profesional revisará su agenda y te notificará si acepta esta cita. 
        Mientras tanto, si tienes alguna duda, no dudes en contactarnos.
      </p>
      <div class="button-container">
        <a href="https://easyjob.com.co" class="button">Ver Detalles de la Cita</a>
      </div>
    </div>
    <div class="footer">
      <p>Gracias por confiar en EasyJob</p>
      <p>Email: <a href="mailto:contacto@easyjob.com.co">contacto@easyjob.com.co</a></p>
      <p>Teléfono: 3181234567 ☎️</p>
      <p>Web: <a href="https://easyjob.com.co">easyjob.com.co</a> 🌐</p>
    </div>
  </div>
</body>
</html>

                                    `;

    sendSmtpEmail.sender = { "name": "EasyJob", "email": "no-reply@easyjob.com.co" }

    sendSmtpEmail.to = [{ "email": `${client.email}`, "name": `${client.name}` }];

    sendSmtpEmail.replyTo = { "email": `${client.email}`, "name": `${client.name}` }

    sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
    sendSmtpEmail.params = { "parameter": "My param value", "subject": "Peticion de cita hecha" };

    await apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
      //console.log('API called successfully. Returned data: ' + JSON.stringify(data));
    }, function (error) {
      console.log(error);
    });


    return appointment;
  }

  async findAppointmentByClient(clientId: string) {

    const client = await this.clientService.findOne(clientId);

    return this.appointmentRepository.find({
      where: { client: client },
      relations: ['client', 'professional', 'service', 'appointmentStatus']
    });
  }

  /*
  async createAppointmentStatus(statusName: AppointmentStatusEnum) {
    const appointmentStatus = this.appointmentStatusRepository.create({ status: statusName });
    await this.appointmentStatusRepository.save(appointmentStatus);
    return appointmentStatus; 
  }*/

  async findAppointmentByProfessional(professional_id: string) {
    const professional = await this.professionalsService.findOne(professional_id);

    return this.appointmentRepository.find({
      where: { professional: professional },
      relations: ['client', 'professional', 'service', 'appointmentStatus']
    });
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.appointmentRepository.find({
      take: limit,
      skip: offset,
    })

  }

  async findOne(id_appointment: string) {

    let appointment: Appointment;

    if (isUUID(id_appointment)) {
      appointment = await this.appointmentRepository.findOne({
        where: { id: id_appointment },
        relations: ['client', 'professional', 'service', 'appointmentStatus']
      });
    }

    if (!appointment) {
      throw new NotFoundException(`Appointment with ${id_appointment} not found`)
    }

    return appointment;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.appointmentRepository.preload({
      id: id,
      ...updateAppointmentDto
    });

    if (!appointment) throw new NotFoundException(`Appointment with id: ${id} not found`);

    try {
      await this.appointmentRepository.save(appointment);
      return appointment;

    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const appointment = await this.findOne(id);
    await this.appointmentRepository.remove(appointment);
  }

  async updateStatus(appointment_id: string, status_name: AppointmentStatusEnum) {
    const appointment = await this.findOne(appointment_id);
    
    const appointmentStatus = await this.appointmentStatusRepository.findOne({where: {status: status_name}});

    appointment.appointmentStatus = appointmentStatus;

    
    const brevo = require('@getbrevo/brevo');
      
    const apiInstance = new brevo.TransactionalEmailsApi();

    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      `${process.env.BREVO_API_KEY}`
    );

    const sendSmtpEmail =  new brevo.SendSmtpEmail();

    let dateString = appointment.date;

    const date = new Date(dateString);

    const date1 = date.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
    const time = date.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    if(appointment.appointmentStatus.status === AppointmentStatusEnum.accepted){
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
            <h1>¡Cita Confirmada!</h1>
          </div>
          <div class="content">
            <h2>Hola ${appointment.client.name},</h2>
            <p>¡Buenas noticias! Tu cita ha sido <strong>confirmada</strong> por el profesional <strong>${appointment.professional.name}</strong>.</p>
            <p>Detalles de la cita:</p>
            <p>📅 Fecha: <strong>${date1}</strong><br>
            ⏰ Hora: <strong>${time}</strong></p>
            <p>El profesional está listo para atenderte en la fecha y hora acordada.</p>
            <a href="#" class="button">Ver Detalles de la Cita</a>
          </div>
          <div class="footer">
            <p>Si necesitas hacer algún cambio, por favor contáctanos con anticipación.</p>
            <p>EasyJob</p>
          </div>
        </div>
      </body>
      </html>
      `;
      
      //console.log(appointment.client.email);

      sendSmtpEmail.sender = {"name":"EasyJob", "email": "no-reply@easyjob.com.co"};
      
      sendSmtpEmail.to = [{"email": `${appointment.client.email}`, "name": `${appointment.client.name}`}];
      
      sendSmtpEmail.replyTo = {"email": `${appointment.professional.email}`, "name": `${appointment.professional.name}`};
      
      sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
      sendSmtpEmail.params = { "parameter": "My param value", "subject": "¡Tu cita ha sido confirmada!" };

      await apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
        //console.log('API called successfully. Returned data: ' + JSON.stringify(data));
      }, function (error) {
          console.log(error);
      });

    }else if(appointment.appointmentStatus.status === AppointmentStatusEnum.rejected){
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
            background-color: #e74c3c;
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
            background-color: #3498db;
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
            <h1>Actualización de tu Cita</h1>
          </div>
          <div class="content">
            <h2>Hola ${appointment.client.name},</h2>
            <p>Lamentamos informarte que el profesional <strong>${appointment.professional.name}</strong> no podrá atender tu cita programada para el día <strong>${date1}</strong> a las <strong>${time}</strong>.</p>
            <p>El motivo es debido a compromisos previos en su agenda para ese horario.</p>
            <p>Te invitamos a:</p>
            <p>1. Seleccionar una nueva fecha y hora<br>
            2. Buscar otro profesional disponible</p>
            <a href="#" class="button">Reagendar Cita</a>
          </div>
          <div class="footer">
            <p>Nos disculpamos por cualquier inconveniente.</p>
            <p>Si necesitas ayuda, nuestro equipo está disponible para asistirte.</p>
            <p>EasyJob</p>
          </div>
        </div>
      </body>
      </html>
      `;

      sendSmtpEmail.sender = {"name":"EasyJob", "email": "no-reply@easyjob.com.co"};

      sendSmtpEmail.to = [{"email": `${appointment.client.email}`, "name": `${appointment.client.name}`}];

      sendSmtpEmail.replyTo = {"email": "support@easyjob.com.co", "name": "EasyJob Support"};

      sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
      sendSmtpEmail.params = { "parameter": "My param value", "subject": "Actualización importante sobre tu cita" };

      await apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
        //console.log('API called successfully. Returned data: ' + JSON.stringify(data));
      }, function (error) {
          console.log(error);
      });
    }
    

    try { 
      await this.appointmentRepository.save(appointment);
      return appointment;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any) {

    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
}
