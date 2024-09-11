import { Injectable, NestMiddleware } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { CreateUserRequestType } from "src/requests-types/users.create.request.type";

@Injectable()
export class TransformUserRequest implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if(req.body) {
      console.log("inside the transformer")
      req.body = plainToInstance(CreateUserRequestType, req.body)
    }
    next();
  }
}