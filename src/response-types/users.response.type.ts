import { IsString, IsEnum } from "class-validator";
import { UserRole } from "../roles/roles.enum";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UserResponseType {
    
    @Expose()
    @IsString()
    username: string;

    @IsString()
    password: string;
    
    @Expose()
    @IsEnum(UserRole)
    role: string;

}