import { Injectable } from '@nestjs/common';
import { CreateClientProfessionalEntityDto } from './dto/create-client_professional_entity.dto';
import { UpdateClientProfessionalEntityDto } from './dto/update-client_professional_entity.dto';

@Injectable()
export class ClientProfessionalEntitiesService {
  create(createClientProfessionalEntityDto: CreateClientProfessionalEntityDto) {
    return 'This action adds a new clientProfessionalEntity';
  }

  findAll() {
    return `This action returns all clientProfessionalEntities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clientProfessionalEntity`;
  }

  update(id: number, updateClientProfessionalEntityDto: UpdateClientProfessionalEntityDto) {
    return `This action updates a #${id} clientProfessionalEntity`;
  }

  remove(id: number) {
    return `This action removes a #${id} clientProfessionalEntity`;
  }
}
