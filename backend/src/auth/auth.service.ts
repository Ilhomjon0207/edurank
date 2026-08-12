import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: { name: string; email: string; password: string }) {
    const hash = await bcrypt.hash(data.password, 10);

    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hash,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    return result;
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    const accessExpiresIn = 15 * 60 * 1000;

    if (!passwordMatch) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
      secret: process.env.JWT_SECRET,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: process.env.JWT_REFRESH_SECRET,
    });
    try {
      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          refreshToken: refreshToken,
        },
      });
    } catch (e) {
      console.error(e);
    }
    return {
      accessToken,
      refreshToken,
      user: safeUser,
      expiresAt: Date.now() + accessExpiresIn,
    };
  }

  async refresh(refreshToken: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const payload = await this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      const accessExpiresIn = 15 * 60 * 1000;
      const user = await this.prisma.user.findUnique({
        where: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
          id: payload.sub,
        },
      });
      if (!user) {
        throw new UnauthorizedException();
      }

      const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      const accessToken = this.jwtService.sign(
        {
          sub: user.id,
          email: user.email,
          role: user.role,
        },
        {
          expiresIn: '15m',
        },
      );

      return {
        accessToken: accessToken,
        expiresAt: Date.now() + accessExpiresIn,
        user: safeUser,
      };
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }

  async logout(userId: string) {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: null,
      },
    });

    return {
      message: 'Logged out successfully',
    };
  }
}
