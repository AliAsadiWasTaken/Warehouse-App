import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Material extends Document{
    @Prop(String)
    name: string
}

export const MaterialSchema = SchemaFactory.createForClass(Material);