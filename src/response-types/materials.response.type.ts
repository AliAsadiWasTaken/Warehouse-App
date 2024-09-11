import { IsString, IsNotEmpty } from "class-validator"

export class MaterialReponseType {

    @IsString()
    @IsNotEmpty()
    name: string
    
    @IsString()
    @IsNotEmpty()
    type: string

}