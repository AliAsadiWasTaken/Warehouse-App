import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { CreateMaterialRequestType } from '../requests-types/materials.create.request.type';
import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose"
import { Material } from '../entities/material.entity';
import { Cache } from 'cache-manager';
import { UpdateMaterialRequestType } from "src/requests-types/materials.update.request.type";


@Injectable()
export class MaterialsService {
    
    constructor(
        @InjectModel(Material.name) private readonly materialModel: Model<Material>,
        @Inject('CACHE_MANAGER') private cacheManager: Cache,
    ) {
        
    }

    findAll() {
        return this.materialModel.find().exec();
    }

    async findOne(name: string) {
        const cachedData = await this.cacheManager.get('Material')
        if (cachedData) {
            return cachedData
        }
        const material = await this.materialModel.findOne({ name: name}).exec();
        if (!material) throw new NotFoundException("Material Not Found!")
        await this.cacheManager.set('Material', material)
        return material
    }

    async create(createMaterial: CreateMaterialRequestType) {
        const material = await this.materialModel.findOne({ name: createMaterial.name}).exec();
        if (material) throw new ConflictException("Material Already Exists!")
        const newMaterial = new this.materialModel(createMaterial);
        return newMaterial.save();
    }
    

    async update(name: string, updatedMaterialType: UpdateMaterialRequestType) {
        const existingMaterial = await this.materialModel.findOneAndUpdate({name: name}, {$set: updatedMaterialType}, { new: true }).exec();
        if (!existingMaterial) {
            throw new NotFoundException("Material Not Found!")
        } 
        return existingMaterial
    }

    async delete(name: string) {
        const material = await this.materialModel.findOne({ name: name}).exec();
        if (!material) throw new NotFoundException("Material Not Found!")
        await this.materialModel.deleteOne({name: name})
        return "Material Deleted!"
    }
}