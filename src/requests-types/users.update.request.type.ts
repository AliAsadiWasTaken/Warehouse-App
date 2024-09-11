import { PartialType } from "@nestjs/mapped-types";
import { CreateUserRequestType } from "./users.create.request.type";

export class UpdateUserRequestType extends PartialType(CreateUserRequestType) {}