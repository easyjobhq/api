import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { recoverEmailContent } from './data/recoverEmailContent';
import { User } from '../entities/user.entity';
import { ProfessionalsService } from 'src/professionals/professionals.service';
import { ClientsService } from 'src/clients/clients.service';
import { Client } from 'src/clients/entities/client.entity';
import { Professional } from 'src/professionals/entities/professional.entity';


@Injectable()
export class AuthUserService {
    constructor(
        private readonly clientService: ClientsService,
        private readonly professionalService: ProfessionalsService
    ) { }


    async resetPassword(email: string) {

        let user: User;

        const new_random_password = this.generateRandomString(10);

        const client: Client = await this.clientService.findOneByEmail(email);

       if (client) {
            user = client
            client.password = bcrypt.hashSync(new_random_password, 10);
            await this.clientService.update(client.id, client);

        } else {

            const professional: Professional = await this.professionalService.findOneByEmail(email);

            if (professional) {
                user = professional
                professional.password = bcrypt.hashSync(new_random_password, 10);
                await this.professionalService.update(professional.id, professional, null);
            } else {
                throw new NotFoundException(`User with email ${email} not found`)
            }

        }

        const brevo = require('@getbrevo/brevo');

        const apiInstance = new brevo.TransactionalEmailsApi();

        apiInstance.setApiKey(
            brevo.TransactionalEmailsApiApiKeys.apiKey,
            `${process.env.BREVO_API_KEY}`
        );

        const sendSmtpEmail = new brevo.SendSmtpEmail();

        sendSmtpEmail.subject = `{{params.subject}}`;

        sendSmtpEmail.htmlContent = recoverEmailContent(user, new_random_password);

        sendSmtpEmail.sender = { "name": "EasyJob", "email": "no-reply@easyjob.com.co" }

        sendSmtpEmail.to = [{ "email": `${user.email}`, "name": `${user.name}` }];

        sendSmtpEmail.replyTo = { "email": `${user.email}`, "name": `${user.name}` }

        sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
        sendSmtpEmail.params = { "parameter": "My param value", "subject": "Reestableciemiento de contraseña" };

        await apiInstance.sendTransacEmail(sendSmtpEmail);
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
