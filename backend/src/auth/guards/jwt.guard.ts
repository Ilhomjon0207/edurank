import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../../common/decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(
        private readonly reflector: Reflector,
    ) {
        super();
    }

    override canActivate(context: ExecutionContext) {

        console.log('JWT GUARD START');

        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [
                context.getHandler(),
                context.getClass(),
            ],
        );

        if (isPublic) {
            console.log('PUBLIC ROUTE');
            return true;
        }

        const result = super.canActivate(context);

        console.log('JWT RESULT:', result);

        return result;
    }
}