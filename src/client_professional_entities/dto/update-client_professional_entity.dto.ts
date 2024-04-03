import { PartialType } from '@nestjs/mapped-types';
import { CreateClientProfessionalEntityDto } from './create-client_professional_entity.dto';

export class UpdateClientProfessionalEntityDto extends PartialType(CreateClientProfessionalEntityDto) {}
