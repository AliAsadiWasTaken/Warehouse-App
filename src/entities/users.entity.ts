import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Exclude, Expose } from "class-transformer";
import { UserRole } from "src/roles/roles.enum";


export type UserDocument = User & Document;
@Exclude()
@Schema()
export class User extends Document {

    @Expose()
    @Prop(String)
    username: string;
    
    @Prop(String)
    password: string;

    @Expose()
    @Prop({enum: UserRole})
    role: UserRole;
    
}

export const UserSchema = SchemaFactory.createForClass(User);