import { Controller, Get, Param, Delete, Patch, ValidationPipe, Body, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequestType } from '../requests-types/users.create.request.type';
import { RolesGuard } from '../guards/roles.guard';
import { UserRole } from '../roles/roles.enum';
import { Roles } from '../roles/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { UpdateUserRequestType } from 'src/requests-types/users.update.request.type';
import { TransformPlainToInstance } from 'class-transformer';
import { UserResponseType } from 'src/response-types/users.response.type';




@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}


    @Get()
    @TransformPlainToInstance(UserResponseType)
    async findAll() {
        return await this.usersService.findAll()
    }

    @Get(':username')
    @TransformPlainToInstance(UserResponseType)
    findOne(@Param("username") username: string) {
        return this.usersService.findOne(username)
    }

    @Post()
    @TransformPlainToInstance(UserResponseType)
    create(@Body() createUserType: CreateUserRequestType) {
        return this.usersService.create(createUserType)
    }
    
    @Patch(':username')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.Admin, UserRole.Manager)
    @TransformPlainToInstance(UserResponseType)
    update(@Param('username') username: string, @Body(ValidationPipe) userUpdateType: UpdateUserRequestType) {
        return this.usersService.update(username, userUpdateType)
    }

    @Delete(':username')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.Admin, UserRole.Manager)
    @TransformPlainToInstance(UserResponseType)
    remove(@Param('username') username: string) {
        return this.usersService.delete(username)

    }
}