import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { CityService } from '../services/city.service';

@Controller("city")
export class CityController{

    constructor(private readonly cityService: CityService) {}


    @Get()
    findAll() {
        return this.cityService.findAll();
    }
}