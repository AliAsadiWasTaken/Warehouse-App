import { IsString, IsNotEmpty } from "class-validator"

export class CreateMaterialDto {

    @IsString()
    @IsNotEmpty()
    name: string

}