import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import {JwtGuard} from "../auth/guards/jwt.guard";
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@Req() req: any) {
        return this.usersService.findById(req.user.id);
    }
}
