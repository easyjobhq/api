import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthProfessionalService } from '../services/auth-professional.service';
import { LoginUserDto } from '../dto/login-user.dto';
import { CreateProfessionalDto } from '../../professionals/dto/create-professional.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../entities/role.enum';
import { GetUser } from '../decorators/get-user.decorator';
import { RolesGuard } from '../guards/user/user.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('auth/professional')
export class AuthProfessionalController {
  constructor(private readonly authService: AuthProfessionalService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('professional_image'))  
  register(
    @Body() createAuthDto: CreateProfessionalDto,
    @UploadedFile() professionalPhoto: Express.Multer.File
  ) {
    return this.authService.create(createAuthDto, professionalPhoto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto ) {
    return this.authService.login( loginUserDto );
  }

  @Get('private')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.Professional)
  testingPrivateRoute(@GetUser() user: any){
    console.log(user)
    return{
      ok: true,
      message:'hello world'
    }
  }

}
