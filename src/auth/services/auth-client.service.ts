import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { Client } from '../../clients/entities/client.entity';
import { LoginUserDto } from '../dto/login-user.dto';
import { CreateClientDto } from '../../clients/dto/create-client.dto';
import { ClientsService } from 'src/clients/clients.service';
import { Express } from 'express';
import { recoverEmailContent } from './data/recoverEmailContent';


@Injectable()
export class AuthClientService {
  constructor(
    @InjectRepository(Client)
    private readonly userRepository: Repository<Client>,
    private readonly jwtService: JwtService,
    private readonly clientService: ClientsService

  ) { }

  async create(createUserDto: CreateClientDto, clientPhoto: Express.Multer.File) {

    try {

      createUserDto.password = bcrypt.hashSync(createUserDto.password, 10)
      const user = await this.clientService.create(createUserDto, clientPhoto);

      return {
        ...user,
        token: this.jwtService.sign({ id: user.id })
      };

    } catch (error) {
      this.handleDBErrors(error);
    }

  }

  async createWithPhotoUrl(createUserDto: CreateClientDto) {

    try {

      createUserDto.password = bcrypt.hashSync(createUserDto.password, 10)

      const user = await this.clientService.createWithPhotoUrl(createUserDto);

      return {
        ...user,
        token: this.jwtService.sign({ id: user.id })
      };

    } catch (error) {
      this.handleDBErrors(error);
    }

  }

  async resetPassword(email: string) {

    const client:Client = await this.clientService.findOneByEmail(email);

    const new_random_password = this.generateRandomString(10);

    client.password = bcrypt.hashSync(new_random_password, 10);

    const clientSaved = await this.clientService.update(client.id, client, null);

    const brevo = require('@getbrevo/brevo');

    const apiInstance = new brevo.TransactionalEmailsApi();

    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      `${process.env.BREVO_API_KEY}`
    );

    const sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.subject = `{{params.subject}}`;

    sendSmtpEmail.htmlContent = recoverEmailContent(client, new_random_password);

    sendSmtpEmail.sender = { "name": "EasyJob", "email": "no-reply@easyjob.com.co" }

    sendSmtpEmail.to = [{ "email": `${client.email}`, "name": `${client.name}` }];

    sendSmtpEmail.replyTo = { "email": `${client.email}`, "name": `${client.name}` }

    sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
    sendSmtpEmail.params = { "parameter": "My param value", "subject": "Reestableciemiento de contraseña" };

    await apiInstance.sendTransacEmail(sendSmtpEmail)
  }

  async login(loginUserDto: LoginUserDto) {

    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true }
    });


    if (!user)
      throw new UnauthorizedException('Credentials are not valid (email)');


    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (password)');

    return {
      ...user,
      token: this.jwtService.sign({ id: user.id })
    };
  }

  async isBcryptHash(hash: string): Promise<boolean> {
    // Verifica que la cadena comience con $2a$, $2b$, $2x$ o $2y$
    const bcryptPattern = /^\$2[abxy]\$\d{2}\$[./A-Za-z0-9]{53}$/;
    return bcryptPattern.test(hash);
  }

  async checkAuthStatus(user: Client) {

    return {
      ...user,
      token: this.jwtService.sign({ id: user.id })
    };

  }

  private handleDBErrors(error: any): never {

    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    console.log(error)

    throw new InternalServerErrorException('Please check server logs');

  }

  private generateRandomString(length: number) {
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '*';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      randomString += charset[randomIndex];
    }
    return randomString;
  }

}
