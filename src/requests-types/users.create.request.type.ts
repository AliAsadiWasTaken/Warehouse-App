import { IsString, IsNotEmpty, IsEnum } from "class-validator";
import { UserRole } from "../roles/roles.enum";
import { Type } from "class-transformer";


export class CreateUserRequestType {
    
    @IsString()
    @IsNotEmpty()
    @Type(() => String)
    username: string;

    @IsString()
    @IsNotEmpty()
    @Type(() => String)
    password: string;
    
    @IsEnum(UserRole, { message: 'role must be one of the following: adming, manager, staff, accountant, supplier'})
    @IsNotEmpty()
    @Type(() => String)
    role: string;

}