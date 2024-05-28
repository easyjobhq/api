import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { LanguageService } from "../services/language.service";

@Controller("language")
export class LanguageController{

    constructor(private readonly languageService: LanguageService) {}


    @Get()
    findAll() {
        return this.languageService.findAll();
    }
}