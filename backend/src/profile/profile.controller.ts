import {Body, Controller, Get, Patch, Post} from '@nestjs/common';
import {ApiBearerAuth} from "@nestjs/swagger";
import {CreateProfileDto} from "./dto/create-profile.dto";
import {CurrentUser} from "../common/decorators";
import {ProfileService} from "./profile.service";
import {UpdateProfileDto} from "./dto/update-profile.dto";

@ApiBearerAuth('JWT')
@Controller('profile')
export class ProfileController {

    constructor(private readonly profileService: ProfileService){}

    @Post()
    create(@CurrentUser() user,@Body() dto: CreateProfileDto){

        return this.profileService.create(user.id,dto)
    }

    @Get('me')
    findMe(@CurrentUser() user){
        return this.profileService.findOne(user.id)
    }

    @Patch()
    update(@CurrentUser() user, @Body() dto: UpdateProfileDto){

        return this.profileService.update(user.id,dto);
    }
}
