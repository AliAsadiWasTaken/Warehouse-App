import { Module } from '@nestjs/common';
import { MaterialsController } from './materials.controller';
import { MaterialsService } from './materials.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Material, MaterialSchema } from '../entities/material.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { LocalStrategy } from 'src/strategies/local.strategy';

@Module({
    imports: [
    AuthModule,
    MongooseModule.forFeature([
        {
        name: Material.name,
        schema: MaterialSchema,
    },
    ])
    ],
    controllers: [MaterialsController],
    providers: [MaterialsService, JwtStrategy, LocalStrategy]
})
export class MaterialsModule {}
