import { Module } from '@nestjs/common';
import { MaterialsController } from './materials.controller';
import { MaterialsService } from './materials.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Material, MaterialSchema } from './entities/material.entity';
import { JwtStrategy } from 'src/auth/guards/jwt.strategy';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { AuthModule } from 'src/auth/auth.module';

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
