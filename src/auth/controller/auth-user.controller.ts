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
import { AuthUserService } from '../services/auth-user.service';

@Controller('auth/user')
export class AuthUserController {
  constructor(private readonly authService: AuthUserService) {}

  @Post('reset-password/:email')
  resetPassword(@Param('email') email: string) {
      return this.authService.resetPassword(email);
  }
  
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto ) {
    return this.authService.login( loginUserDto );
  }

}
