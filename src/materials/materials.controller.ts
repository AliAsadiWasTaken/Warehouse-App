import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './materials-dto/create-material.dto';
import { UpdateMaterialDto } from './materials-dto/update-material.dto';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { Roles } from 'src/users/decorators/roles.decorator';
import { UserRole } from 'src/users/decorators/roles.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { MaterialsInterceptor } from './interceptors/materials.interceptor';

@Controller('materials')
export class MaterialsController {

    constructor(private readonly materialsService: MaterialsService) {}
    
    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.Admin, UserRole.Manager, UserRole.Staff, UserRole.Supplier, UserRole.Accountant)
    @UseInterceptors(MaterialsInterceptor)
    findAll() {
        return this.materialsService.findAll()
    }
    
    @Get(':name')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.Admin, UserRole.Manager, UserRole.Staff, UserRole.Supplier, UserRole.Accountant)
    @UseInterceptors(MaterialsInterceptor)
    findOne(@Param("name") name: string) {
        return this.materialsService.findOne(name)
    }        
    
    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.Admin, UserRole.Manager, UserRole.Staff, UserRole.Supplier)
    @UseInterceptors(MaterialsInterceptor)
    async create(@Body(ValidationPipe) createMaterialDto: CreateMaterialDto) {
        return await this.materialsService.create(createMaterialDto);
    }
    
    @Patch(':name')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.Admin, UserRole.Manager, UserRole.Staff, UserRole.Supplier)
    @UseInterceptors(MaterialsInterceptor)
    update(@Param('name') name: string, @Body(ValidationPipe) materialUpdateDto: UpdateMaterialDto) {
        return this.materialsService.update(name, materialUpdateDto)
    }
    @Delete(':name')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.Admin, UserRole.Manager, UserRole.Staff, UserRole.Supplier)
    @UseInterceptors(MaterialsInterceptor)
    remove(@Param('name') name: string) {
        return this.materialsService.delete(name)
    }
}
