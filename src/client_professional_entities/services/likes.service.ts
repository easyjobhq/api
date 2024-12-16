import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientsService } from 'src/clients/clients.service';
import { ProfessionalsService } from 'src/professionals/professionals.service';
import { Repository } from 'typeorm';

@Injectable()
export class LikesService {
  private readonly logger = new Logger('LikesService');

  constructor(
    private readonly clientService: ClientsService,
    private readonly professionalService: ProfessionalsService 
  
  ) {}

  async clientLikes(id_client: string, id_professional: string) {
    const professional = await this.professionalService.findOne(id_professional);
    const client = await this.clientService.findOne(id_client);

    client.likes.push(professional);
    await this.clientService.save(client);

    return client
  }

  async getLikesByClient(id_client: string) {
    const client = await this.clientService.findOne(id_client)
    return client.likes
  }


}

