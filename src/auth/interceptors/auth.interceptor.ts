import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
          map((data) => {
            if (Array.isArray(data)) {
              return data.map(user => {
                const { password, _id, __v, ...rest } = user;
                return rest;
              });
            }
            const { password, _id, __v, ...rest } = data;
            return rest;
          }),
        );
      }
    }