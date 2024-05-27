import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthProfessionalService } from '../services/auth-professional.service';
import { LoginUserDto } from '../dto/login-user.dto';
import { CreateProfessionalDto } from '../../professionals/dto/create-professional.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../entities/role.enum';
import { GetUser } from '../decorators/get-user.decorator';
import { RolesGuard } from '../guards/user/user.guard';
import { AuthAdminService } from '../services/auth-admin.service';

@Controller('auth/admin')
export class AuthAdminController {
    constructor(private readonly authService: AuthAdminService) {}

    @Post('register')
    register(@Body() createAuthDto: CreateProfessionalDto) {
        return this.authService.create(createAuthDto);
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
