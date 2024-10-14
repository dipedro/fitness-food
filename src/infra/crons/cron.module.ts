import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { NestJSSchedulerService } from './nestjs-scheduler/nestjs-scheduler.service';
import { HttpRequestModule } from '../https/http-request.module';
import { RepositoryNameEnum } from '@root/src/app/shared/enums';

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
    ],
})
export class CronModule {}
