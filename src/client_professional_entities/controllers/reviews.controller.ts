import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReviewService } from '../review.service';
import { CreateProfessionalDto } from 'src/professionals/dto/create-professional.dto';
import { CreateReviewDto } from '../dto/create-review.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';


@Controller('reviews')
export class ReviewsController {

  constructor(
    private readonly reviewsService: ReviewService
    ) {}

    @Get()
    findAll() {
        return this.reviewsService.findAll({limit: 10, offset: 0});
    }

    @Post('client/:id_client/profesional/:id_professional')
    register( @Param(':id_client') id_client:string , @Param(':id_professional') id_professional:string, @Body() createReviewDto: CreateReviewDto) {
        return this.reviewsService.create(id_client, id_professional, createReviewDto);
    }

    @Delete('/:id_review')
    removeOne(@Param(':id_review') id_review: string) {
        return this.reviewsService.remove(id_review);
    }


}
