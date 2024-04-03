import { PartialType } from '@nestjs/mapped-types';
import { CreateGeneralResourceDto } from './create-general_resource.dto';

export class UpdateGeneralResourceDto extends PartialType(CreateGeneralResourceDto) {}
