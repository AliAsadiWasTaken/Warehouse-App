import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from '../guards/local.guard';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { Request } from 'express';
import { TransformPlainToInstance } from 'class-transformer';
import { AuthRequestPayloadType } from 'src/requests-types/auth.request.type';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('login')
    @UseGuards(LocalGuard)
    @TransformPlainToInstance(AuthRequestPayloadType)
    login(@Req() req: Request) {
        return req.user;
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    @TransformPlainToInstance(AuthRequestPayloadType)
    status(@Req() req: Request) {
        return req.user;
    }

}
