import { Module } from '@nestjs/common';
import { MaterialsController } from './materials.controller';
import { MaterialsService } from './materials.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Material, MaterialSchema } from './entities/material.entity';

@Module({
    imports: [MongooseModule.forFeature([
        {
        name: Material.name,
        schema: MaterialSchema,
    },])
],
    controllers: [MaterialsController],
    providers: [MaterialsService]
})
export class MaterialsModule {}
