import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import { UsersService } from './users.service';
import  {CurrentUser} from "../common/decorators/current-user.decorator"
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@CurrentUser() user) {
        return user;
    }
}
