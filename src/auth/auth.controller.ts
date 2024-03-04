import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminDTO } from 'src/admin/admin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  async signUp(@Body() data: AdminDTO): Promise<AdminDTO>{
    return this.authService.signUp(data);
  }

  @Post('signIn')
  async signIn(@Body() data: AdminDTO): Promise<{access_token: string}>{
    return this.authService.signIn(data);
  }
}
