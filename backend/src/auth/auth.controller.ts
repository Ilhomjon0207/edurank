import {
  Body,
  Controller,
  Headers,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import express from 'express';
import { Public } from '../common/decorators/public.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RefreshDto } from './dto/refresh.dto';
import { CurrentUser } from '../common/decorators';

@ApiBearerAuth('JWT')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@CurrentUser() user) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return user;
  }

  @Post('refresh')
  @Public()
  refresh(@Body() body: RefreshDto) {
    return this.authService.refresh(body.refreshToken);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Req() req: express.Request) {
    const user = req as any;
    console.log(user.user);
    return this.authService.logout(user.user.id);
  }
}
