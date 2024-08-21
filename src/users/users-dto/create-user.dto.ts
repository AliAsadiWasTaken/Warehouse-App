import { IsString, IsNotEmpty, IsEnum } from "class-validator";
import { UserRole } from "../decorators/roles.enum";


export class CreateUserDto {
    
    @IsString()
    @IsNotEmpty()
    username: string;
    
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    password: string;
    
    @IsEnum(UserRole, { message: 'role must be one of the following: adming, manager, staff, accountant, supplier'})
    @IsNotEmpty()
    role: string;

}