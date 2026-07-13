import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService,private readonly jwtService: JwtService) {

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

        const { password, ...result } = user;

        return result;
    }

    async login(email: string, password: string) {
        const user=await this.prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new UnauthorizedException('Email or password is incorrect');
        }

        const passwordMatch=await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new UnauthorizedException('Email or password is incorrect');
        }

        const payload = {
            sub:user.id,
            email: user.email,
            role:user.role,
        }
        const safeUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
        return {
            access_token:this.jwtService.sign(payload),
            user:safeUser,
        }
    }
}
