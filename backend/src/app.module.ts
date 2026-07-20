import {ConfigModule} from '@nestjs/config';
import {Module} from "@nestjs/common";
import {PrismaModule} from "./prisma/prisma.module";
import {AuthModule} from './auth/auth.module';
import {UsersController} from './users/users.controller';
import {UsersService} from './users/users.service';
import {UsersModule} from './users/users.module';
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "./auth/guards/jwt.guard";
import {RolesGuard} from "./auth/guards/roles.guard";
import {SkillModule} from './skill/skill.module';
import {ProfileModule} from './profile/profile.module';
import {JobModule} from './job/job.module';
import {ApplicationsModule} from './applications/applications.module';
import { CriterionModule } from './criterion/criterion.module';
import { RankingModule } from './ranking/ranking.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    SkillModule,
    ProfileModule,
    JobModule,
    ApplicationsModule,
    CriterionModule,
    RankingModule,
    DashboardModule,
  ],
  controllers: [UsersController],
  providers: [UsersService,
    {
      provide:APP_GUARD,
      useClass: JwtAuthGuard,
    },{
    provide:APP_GUARD,
      useClass: RolesGuard,
    }

    ],
})
export class AppModule {}