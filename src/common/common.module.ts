import { Module } from '@nestjs/common';
import { PaginationDto } from './dtos/pagination.dto';

@Module({})
export class CommonModule {
    exports:[CommonModule,PaginationDto]
}
