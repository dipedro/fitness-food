import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './app/modules/health/health.module';
import { ProductModule } from './app/modules/product/product.module';
import { CronModule } from './infra/crons/cron.module';
import { DatabaseModule } from './infra/databases/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    HealthModule,
    ProductModule,
    CronModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
