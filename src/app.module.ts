import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './app/modules/health/health.module';
import { ProductModule } from './app/modules/product/product.module';
import { CronModule } from './infra/crons/cron.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HealthModule,
    ProductModule,
    CronModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
