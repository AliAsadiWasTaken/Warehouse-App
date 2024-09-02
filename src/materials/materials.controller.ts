import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from '../dtos/create-material.dto';
import { UserRole } from 'src/decorators/roles.enum';
import { MaterialsInterceptor } from '../interceptors/materials.interceptor';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UpdateMaterialDto } from 'src/dtos/update-material.dto';
import { RolesGuard } from 'src/guards/roles.guard';

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
