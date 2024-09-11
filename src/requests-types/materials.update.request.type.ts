
import { PartialType } from "@nestjs/mapped-types"
import { CreateMaterialRequestType } from "./materials.create.request.type";

export class UpdateMaterialRequestType extends PartialType(CreateMaterialRequestType) {}