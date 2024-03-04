import { Body, Controller, Delete, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AdminService } from './admin.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { NoticesDTO } from 'src/notices/notices.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(AuthGuard)
  @Post('createNotice')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(
    @UploadedFile() image: Express.Multer.File,
    @Body() arquivoDTO: NoticesDTO
  ): Promise<{message: string}>
  {

    const result = this.adminService.upload(image, arquivoDTO);
    
    return result;

  }

  @UseGuards(AuthGuard)
  @Put('updateNotice/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateNotice(
    @Param('id') id:string,
    @UploadedFile() image: Express.Multer.File,
    @Body() data: NoticesDTO
  )
  {

    const response = await this.adminService.updateNotice(id, image, data);

    return response

  }

  @UseGuards(AuthGuard)
  @Delete('deleteNotice/:id')
  async deleteNotice(@Param('id') id: string): Promise<{message: string}>{
    
    const response = await this.adminService.deleteNotice(id);

    return response;

  }
}
