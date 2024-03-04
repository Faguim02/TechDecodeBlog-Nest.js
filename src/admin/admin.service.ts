import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { NoticesDTO } from 'src/notices/notices.dto';
import { supabase } from 'src/supabase/supabase.config';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminService {
    constructor(
        private prisma: PrismaService,
        private configService: ConfigService
    ){}

    private supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    private supabaseKEY = this.configService.get<string>('SUPABASE_KEY');

    async upload(image: Express.Multer.File, arquivoDTO: NoticesDTO): Promise<{message: string}>{

        const dataAtual = new Date().toISOString().slice(0, 10);

        const noticeExists = await this.prisma.notices.findFirst({
            where: {
                title: arquivoDTO.title
            }
        })

        if(noticeExists){
            throw new Error('notice is exists')
        }

        const noticeId = await this.prisma.notices.create({
            data: {
                title: arquivoDTO.title,
                subtitle: arquivoDTO.title,
                description: arquivoDTO.description,
                font_noticie: arquivoDTO.font_noticie,
                view: Number(arquivoDTO.view),
            }
        })

        await supabase(this.supabaseUrl, this.supabaseKEY).storage.from("noticies").upload(`${noticeId.id}`, image.buffer, {
            upsert: true,
            contentType: 'image/jpeg',
        })

        return {
            message: "Noticia criada com sucesso!"
        };

    }
    //-----------------------------------------------------------\\

    async updateNotice(id: string, image: Express.Multer.File, data: NoticesDTO){

        if(!image && !data){
            throw new Error('preencha os campos')
        }
        
        if(image){
            await supabase(this.supabaseUrl, this.supabaseKEY).storage.from('noticies').update(id, image.buffer);
        }

        await this.prisma.notices.update({
            where: {
                id
            },
            data:{
                title: data.title,
                subtitle: data.subtitle,
                description: data.description,
                font_noticie: data.font_noticie
            }
        });

        return {
            message: 'Atualizado com sucesso!'
        }

    }

    //------------------------------------------------------------\\
    async deleteNotice(id: string): Promise<{message: string}>{

        const noticeExists = await this.prisma.notices.findFirst({
            where: {
                id
            }
        })

        if (!noticeExists){
            throw new Error('notice does not exists')
        }

        await this.prisma.notices.delete({
            where:{
                id
            }
        })

        await supabase(this.supabaseUrl, this.supabaseKEY).storage.from("noticies").remove([id]);

        return {
            message: "Noticia deletada com sucesso!"
        };

    }
}