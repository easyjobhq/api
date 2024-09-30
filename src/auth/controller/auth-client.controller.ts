import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthClientService } from '../services/auth-client.service';
import { LoginUserDto } from '../dto/login-user.dto';
import { CreateClientDto } from '../../clients/dto/create-client.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../entities/role.enum';
import { GetUser } from '../decorators/get-user.decorator';
import { RolesGuard } from '../guards/user/user.guard';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('auth/client')
export class AuthClientController {
  constructor(private readonly authService: AuthClientService) {}

  @UseInterceptors(FileInterceptor('client_image'))
  @Post('register')
  register(
    @Body() createAuthDto: CreateClientDto, 
    @UploadedFile() clientPhoto: Express.Multer.File
  ) {
    return this.authService.create(createAuthDto, clientPhoto );
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto ) {
    return this.authService.login( loginUserDto );
  }

  @Get('private')
  @UseGuards(AuthGuard(),RolesGuard)
  @Roles(Role.Client)
  testingPrivateRoute(@GetUser() user: any){
    return{
      ok: true,
      message:'hello world'
    }
  }

}
