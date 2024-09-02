import { model } from "mongoose";
import { User, UserSchema } from "./users.entity";

export const UserModel = model<User>('User', UserSchema);