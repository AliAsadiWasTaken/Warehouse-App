import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { map, Observable } from "rxjs";
import { User, UserSchema } from "src/entities/users.entity";
import { UserModel } from "src/entities/users.model";

@Injectable()
export class DummyInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<User[]>): Observable<any> | Promise<Observable<any>> {

        return next.handle().pipe(map((data) => plainToInstance(UserModel, data, { excludeExtraneousValues: false })))
    }
}