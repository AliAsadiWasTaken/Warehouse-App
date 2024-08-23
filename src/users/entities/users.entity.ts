import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { UserRole } from "../decorators/roles.enum";
import { Exclude, Expose } from "class-transformer";


export type UserDocument = User & Document;
@Schema()
export class User extends Document {

    @Prop(String)
    username: string;

    @Prop(String)
    firstName: string;

    @Prop(String)
    lastName: string;

    @Exclude()
    @Prop(String)
    password: string;

    @Prop({enum: UserRole})
    role: UserRole;
    
}

export const UserSchema = SchemaFactory.createForClass(User);