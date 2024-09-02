import { Controller, Get, Param, Delete, Patch, ValidationPipe, Body, Post, UseGuards, UseInterceptors, SerializeOptions, ClassSerializerInterceptor } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { RolesGuard } from '../guards/roles.guard';
import { UserRole } from '../decorators/roles.enum';
import { Roles } from '../decorators/roles.decorator';
import { UsersInterceptor } from '../interceptors/users.interceptor';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import { DummyInterceptor } from 'src/interceptors/dummy-interceptor';




@Controller('users')
@SerializeOptions({strategy: 'excludeAll'})
export class UsersController {

    constructor(private readonly usersService: UsersService) {}


    @Get()
    @UseInterceptors(UsersInterceptor)
    async findAll() {
        return await this.usersService.findAll()
    }

    @Get(':username')
    @UseInterceptors(DummyInterceptor)
    findOne(@Param("username") username: string) {
        return this.usersService.findOne(username)

    }

    @Post()
    @UseInterceptors(UsersInterceptor)
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
    }
    
    @Patch(':username')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.Admin, UserRole.Manager)
    @UseInterceptors(UsersInterceptor)
    update(@Param('username') username: string, @Body(ValidationPipe) userUpdateDto: UpdateUserDto) {
        return this.usersService.update(username, userUpdateDto)
    }
    @Delete(':username')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.Admin, UserRole.Manager)
    @UseInterceptors(UsersInterceptor)
    remove(@Param('username') username: string) {
        return this.usersService.delete(username)

    }
}