import {Controller, Get} from '@nestjs/common';
import {DashboardService} from "./dashboard.service";
import {ApiBearerAuth} from "@nestjs/swagger";
import {Role} from "@prisma/client";
import {Roles} from "../common/decorators/roles.decorator";

@ApiBearerAuth('JWT')
@Controller('dashboard')
export class DashboardController {


    constructor(private readonly dashboardService: DashboardService) {
    }


    @Get('statistics')
    @Roles(Role.ADMIN, Role.TEACHER)
    statistics() {

        return this.dashboardService.statistics();
    }
}
