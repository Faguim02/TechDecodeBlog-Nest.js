import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { hash, compare } from 'bcrypt'
import { AdminDTO } from 'src/admin/admin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ){}

    async signUp(data: AdminDTO): Promise<AdminDTO>{

        const passwordHash = await hash(data.user_password, 8);

        data.user_password = passwordHash;

        return await this.prisma.admin.create({
            data
        })

    }

    async signIn(data: AdminDTO):Promise<{access_token: string}>{

        const emailExists = await this.prisma.admin.findFirst({
            where: {
                user_email: data.user_email,
            }
        })

        if(!emailExists) {
            throw new UnauthorizedException();
        }

        const passwordCompare = await compare(data.user_password, emailExists.user_password)
        
        if(!passwordCompare){
            throw new UnauthorizedException();
        }

        const payload = { sub: emailExists.id, username: emailExists.user_name }

        return {
            access_token: await this.jwtService.signAsync(payload)
        }

    }
}
