import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "../decorators/roles.type";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        
        const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user || !user.role) {
            throw new ForbiddenException('User not found or missing role in token.');
        }
        const hasRole = () => roles.includes(user.role);
        if (!hasRole()) {
            throw new ForbiddenException('You do not have permission to perform this action.');
        }

        return true;
    }
}