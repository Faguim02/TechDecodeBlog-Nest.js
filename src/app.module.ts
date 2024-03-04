import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { NoticesModule } from './notices/notices.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AdminModule, NoticesModule, AuthModule, ConfigModule.forRoot({isGlobal: true})],
  controllers: [],
  providers: [],
})
export class AppModule {}
