import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Controller('materials')
export class MaterialsController {

    constructor(private readonly materialsService: MaterialsService) {}
    
    @Get()
    findAll() {
        return this.materialsService.findAll()
    }
    
    @Get(':name')
    findOne(@Param("name") name: string) {
        return this.materialsService.findOne(name)
    }        
    
    @Post()
    create(@Body(ValidationPipe) createMaterialDto: CreateMaterialDto) {
        return this.materialsService.create(createMaterialDto)
    }
    
    @Patch(':name')
    update(@Param('name') name: string, @Body(ValidationPipe) materialUpdateDto: UpdateMaterialDto) {
        return this.materialsService.update(name, materialUpdateDto)
    }
    @Delete(':name')
    remove(@Param('name') name: string) {
        return this.materialsService.delete(name)
    }
}
