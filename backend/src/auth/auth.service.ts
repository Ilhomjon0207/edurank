import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService, private readonly jwtService: JwtService) {

    }

    async register(data: {
        name: string;
        email: string;
        password: string;
    }) {
        const hash = await bcrypt.hash(data.password, 10);

        const user = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hash,
            },
        });

        const {password, ...result} = user;

        return result;
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: email
            }
        })

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
        }
        const safeUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };

        const access_token = this.jwtService.sign(payload, {
            expiresIn: '15m',
            secret: process.env.JWT_SECRET,
        });

        const refresh_token = this.jwtService.sign(payload, {
            expiresIn: '7d',
            secret: process.env.JWT_REFRESH_SECRET,
        })
        try {

            const updatedUser = await this.prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    refreshToken: refresh_token,
                },
            });
        } catch (e) {
            console.error(e);
        }
        return {
            access_token,
            refresh_token,
            user: safeUser,
            expiresAt: Date.now() + accessExpiresIn,
        }
    }

    async refresh(refreshToken: string) {

        try {
            const payload = await this.jwtService.verify(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET
            })


            const user = await this.prisma.user.findUnique({
                where: {
                    id: payload.sub
                }
            })
            if (!user) {
                throw new UnauthorizedException();

            }

            const safeUser = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            }

            const accessToken = this.jwtService.sign({
                    sub: user.id,
                    email: user.email,
                    role: user.role,
                }, {
                    expiresIn: '15m',
                }
            );

            return {
                accessToken: accessToken,
                expiresIn: 900,
                user: safeUser,
            }
        } catch (e) {
            console.error('Refresh error:', e);
            throw new UnauthorizedException(e.message);
        }
    }

    async logout(userId: number) {


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
