import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { createSpecialityDto } from './create-speciality.dto';

export class UpdateSpecialityDto extends PartialType(createSpecialityDto) {
    @IsString()
    @IsOptional()
    readonly id?: string;
}
