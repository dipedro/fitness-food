import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { RepositoryNameEnum } from '@shared/enums';
import { CronHistoryPgRepository } from '../databases/postgres/repositories/cron-history.repository';
import { ProductPreloadPgRepository } from '../databases/postgres/repositories/product-preload.repository';
import { HttpRequestModule } from '../https/http-request.module';
import { NestJSSchedulerService } from './nestjs-scheduler/nestjs-scheduler.service';
import { ProductPgRepository } from '../databases/postgres/repositories/product.repository';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        HttpRequestModule
    ],
    providers: [
        {
            provide: RepositoryNameEnum.CRON_REPOSITORY,
            useClass: NestJSSchedulerService,
        },
        {
            provide: RepositoryNameEnum.CRON_HISTORY_REPOSITORY,
            useClass: CronHistoryPgRepository
        },
        {
            provide: RepositoryNameEnum.PRODUCT_PRELOAD_REPOSITORY,
            useClass: ProductPreloadPgRepository
        },
        {
            provide: RepositoryNameEnum.PRODUCT_REPOSITORY,
            useClass: ProductPgRepository
        }
    ],
})
export class CronModule {}
