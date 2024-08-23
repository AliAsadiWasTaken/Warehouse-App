import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class MaterialsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map(material => {
            const { _id, __v, ...onlyMaterial } = material.toObject();
            return onlyMaterial;
          });
        } 
        const { _id, __v, ...onlyMaterial } = data.toObject();
        return onlyMaterial;
      })
    );
  }
}
