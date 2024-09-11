import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { UserRole } from 'src/roles/roles.enum';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { CreateMaterialRequestType } from 'src/requests-types/materials.create.request.type';
import { UpdateMaterialRequestType } from 'src/requests-types/materials.update.request.type';
import { TransformPlainToInstance } from 'class-transformer';
import { MaterialReponseType } from 'src/response-types/materials.response.type';

@Controller('materials')
export class MaterialsController {

    constructor(private readonly materialsService: MaterialsService) {}
    
    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.Admin, UserRole.Manager, UserRole.Staff, UserRole.Supplier, UserRole.Accountant)
    @TransformPlainToInstance(MaterialReponseType)
    findAll() {
        return this.materialsService.findAll()
    }
    
    @Get(':name')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.Admin, UserRole.Manager, UserRole.Staff, UserRole.Supplier, UserRole.Accountant)
    @TransformPlainToInstance(MaterialReponseType)
    findOne(@Param("name") name: string) {
        return this.materialsService.findOne(name)
    }        
    
    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.Admin, UserRole.Manager, UserRole.Staff, UserRole.Supplier)
    @TransformPlainToInstance(MaterialReponseType)
    async create(@Body(ValidationPipe) createMaterialDto: CreateMaterialRequestType) {
        return await this.materialsService.create(createMaterialDto);
    }
    
    @Patch(':name')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.Admin, UserRole.Manager, UserRole.Staff, UserRole.Supplier)
    @TransformPlainToInstance(MaterialReponseType)
    update(@Param('name') name: string, @Body(ValidationPipe) materialUpdateDto: UpdateMaterialRequestType) {
        return this.materialsService.update(name, materialUpdateDto)
    }
    @Delete(':name')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.Admin, UserRole.Manager, UserRole.Staff, UserRole.Supplier)
    @TransformPlainToInstance(MaterialReponseType)
    remove(@Param('name') name: string) {
        return this.materialsService.delete(name)
    }
}
