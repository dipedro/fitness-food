import { Module } from '@nestjs/common';
import { HealthModule } from './app/modules/health/health.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HealthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
