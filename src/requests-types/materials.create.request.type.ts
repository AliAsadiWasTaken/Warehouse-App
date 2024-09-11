import { IsString, IsNotEmpty } from "class-validator"

export class CreateMaterialRequestType {

    @IsString()
    @IsNotEmpty()
    name: string
    
    @IsString()
    @IsNotEmpty()
    type: string

}