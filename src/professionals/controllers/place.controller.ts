import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreatePlaceDTO } from "../dto/create-place.dto";
import { PlacesService } from "../places.service";

@Controller('places')
export class PlacesController {
  constructor(
        private readonly placesService: PlacesService
    ) {}

  @Post('professionals/:professional_id')
  create(
    @Param('professional_id') professional_id: string,
    @Body() createPlaceDto: CreatePlaceDTO,
  ) {
    return this.placesService.create(professional_id, createPlaceDto);
  }

    @Get('professionals/:professional_id')
    findByProfessional(@Param('professional_id') professional_id: string) {
        return this.placesService.findByProfessional(professional_id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.placesService.remove(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePlaceDto: CreatePlaceDTO) {
        return this.placesService.update(id, updatePlaceDto);
    }

}
