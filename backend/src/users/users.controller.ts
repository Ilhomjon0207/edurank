import {Controller, Get, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {CurrentUser} from "../common/decorators";

@Controller('users')
export class UsersController {

    constructor() {}

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@CurrentUser() user) {
        return user;
    }
}
