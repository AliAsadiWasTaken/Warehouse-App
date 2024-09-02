import {
    Injectable,
    NestInterceptor,
    CallHandler,
    ExecutionContext,
    InternalServerErrorException,
    BadRequestException,
  } from '@nestjs/common';
  import { Observable, throwError } from 'rxjs';
  import { catchError, map } from 'rxjs/operators';
  
  @Injectable()
  export class UsersInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
              if (Array.isArray(data)) {
                return data.map(user => {
                  const { password, _id, __v, ...rest } = user.toObject();
                  return rest;
                });
              }
              const { password, _id, __v, ...rest } = data.toObject();
              return rest;
            }),
            // catchError((error) => {
            //   console.error('Error in Users interceptor:', error);
      
            //   return throwError(
            //     new BadRequestException('An error occurred while processing the data.'),
            //   );
            // }),
          );
        }
      }