import { Body, Controller, Get, HttpException, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthPayloadDto } from '../dtos/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalGuard } from '../guards/local.guard';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { Request } from 'express';
import { AuthInterceptor } from '../interceptors/auth.interceptor';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('login')
    @UseGuards(LocalGuard)
    @UseInterceptors(AuthInterceptor)
    login(@Req() req: Request) {
        return req.user;
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthInterceptor)
    status(@Req() req: Request) {
        return req.user;
    }
    


}
