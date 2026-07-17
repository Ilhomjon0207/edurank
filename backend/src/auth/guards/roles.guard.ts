import {
    CanActivate,
    ExecutionContext,
    Injectable,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';

import { Role } from '@prisma/client';
import {ROLES_KEY} from "../../common/decorators/roles.decorator";


@Injectable()
export class RolesGuard implements CanActivate {

    constructor(
        private reflector: Reflector,
    ){}


    canActivate(context: ExecutionContext){

        console.log('HANDLER:', context.getHandler().name);
        console.log(
            'CLASS:',
            context.getClass().name
        );

        const roles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [
                context.getHandler(),
                context.getClass(),
            ],
        );


        console.log('REQUIRED ROLES:', roles);


        if (!roles) {
            return true;
        }


        const request = context.switchToHttp().getRequest();

        console.log('HANDLER:', context.getHandler().name);
        console.log('ROLES:', roles);
        console.log('USER:', request.user);


        const user = request.user;


        if (!user) {
            return false;
        }


        return roles.includes(user.role);
    }
}