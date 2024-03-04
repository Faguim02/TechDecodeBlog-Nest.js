import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { supabase } from 'src/supabase/supabase.config';
import { NoticesDTO } from './notices.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NoticesService {
    constructor(
        private prisma: PrismaService,
        private configService: ConfigService
    ){}

    private supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    private supabaseKEY = this.configService.get<string>('SUPABASE_KEY');

    async findAllNotices(): Promise<NoticesDTO[]>{

        const allNoticesDataBase = await this.prisma.notices.findMany()

        const notices: NoticesDTO[] = [];

        for(const notice of allNoticesDataBase){
            let url_img = supabase(this.supabaseUrl, this.supabaseKEY).storage.from('noticies').getPublicUrl(notice.id).data.publicUrl;
            notices.push({...notice, url_image: url_img});
        }

        return notices;

    }

    async findOneNotice(id: string): Promise<NoticesDTO>{
        
        const notice = await this.prisma.notices.findFirst({
            where: {
                id
            }
        });

        await this.prisma.notices.update({
            where: {
                id
            },
            data: {
                view: notice.view + 1
            }
        })

        const { data } = supabase(this.supabaseUrl, this.supabaseKEY).storage.from('noticies').getPublicUrl(id)

        return {
            ...notice,
            url_image: data.publicUrl
        }
    }
}
