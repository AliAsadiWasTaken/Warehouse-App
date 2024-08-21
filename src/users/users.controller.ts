import { Controller, Get, Param, Delete, Patch, ValidationPipe, Body, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './users-dto/create-user.dto';
import { UpdateUserDto } from './users-dto/update-user.dto';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserRole } from './decorators/roles.enum';
import { Roles } from './decorators/roles.decorator';




@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}


    @Get()
    findAll() {
        return this.usersService.findAll()
    }

    @Get(':username')
    findOne(@Param("username") username: string) {
        return this.usersService.findOne(username)

    }

    @Post()
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
    }
    
    @Patch(':username')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.Admin, UserRole.Manager)
    update(@Param('username') username: string, @Body(ValidationPipe) userUpdateDto: UpdateUserDto) {
        return this.usersService.update(username, userUpdateDto)
    }
    @Delete(':username')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.Admin, UserRole.Manager)
    remove(@Param('username') username: string) {
        return this.usersService.delete(username)

    }
}