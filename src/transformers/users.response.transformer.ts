import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { UserResponseType } from 'src/response-types/users.response.type';

@Injectable()
export class TransformUserResponse implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const originalSend = res.send.bind(res);

    res.send = (data: any) => {
      const transformedData = plainToInstance(UserResponseType, data);
      console.log(transformedData)
      return originalSend(transformedData); 
    };

    next();
  }
}