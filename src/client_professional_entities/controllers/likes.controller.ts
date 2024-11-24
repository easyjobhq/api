import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReviewService } from '../review.service';
import { AuthGuard } from '@nestjs/passport';
import { LikesService } from '../services/likes.service';


@Controller('likes')
export class LikesController {

  constructor(
    private readonly likesService: LikesService
    ) {}

    @Post('client/:id_client/professional/:id_professional')
    findAll(@Param('id_client') id_client: string, @Param('id_professional') id_professional: string) {
        return this.likesService.clientLikes(id_client, id_professional);
    }

    @Get('client/:id_client')
    getLikesByClient(@Param('id_client') id_client: string) {
        return this.likesService.getLikesByClient(id_client);
    }    

}
