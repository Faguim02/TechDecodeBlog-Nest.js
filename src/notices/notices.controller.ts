import { Controller, Get, Param } from '@nestjs/common';
import { NoticesService } from './notices.service';
import { NoticesDTO } from './notices.dto';

@Controller('notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @Get('')
  async findAllNotices(): Promise<NoticesDTO[]>{
    const response = await this.noticesService.findAllNotices();

    return response
  }

  @Get(':id')
  async findOneNotice(@Param('id') id: string): Promise<NoticesDTO>{
    const response = await this.noticesService.findOneNotice(id);

    return response;
  }
}
