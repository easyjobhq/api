import { Injectable } from '@nestjs/common';
import { CreateGeneralResourceDto } from './dto/create-general_resource.dto';
import { UpdateGeneralResourceDto } from './dto/update-general_resource.dto';

@Injectable()
export class GeneralResourcesService {
  create(createGeneralResourceDto: CreateGeneralResourceDto) {
    return 'This action adds a new generalResource';
  }

  findAll() {
    return `This action returns all generalResources`;
  }

  findOne(id: number) {
    return `This action returns a #${id} generalResource`;
  }

  update(id: number, updateGeneralResourceDto: UpdateGeneralResourceDto) {
    return `This action updates a #${id} generalResource`;
  }

  remove(id: number) {
    return `This action removes a #${id} generalResource`;
  }
}
