import { Module } from '@nestjs/common';
import { GeneralResourcesService } from './general_resources.service';
import { GeneralResourcesController } from './general_resources.controller';

@Module({
  controllers: [GeneralResourcesController],
  providers: [GeneralResourcesService],
})
export class GeneralResourcesModule {}
