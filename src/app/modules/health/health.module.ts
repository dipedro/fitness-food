import { HealthPgRepository } from '@databases/postgres/repositories/health.repository';
import { Module } from '@nestjs/common';
import { RepositoryNameEnum } from '@shared/enums';
import { HealthController } from './controllers/health.controller';
import { HealthService } from './services/health.service';
import { CronHistoryPgRepository } from '@infra/databases/postgres/repositories/cron-history.repository';

@Module({
	imports: [],
  	controllers: [HealthController],
  	providers: [
		HealthService,
		{
			provide: RepositoryNameEnum.HEALTH_REPOSITORY,
			useClass: HealthPgRepository
		},
		{
			provide: RepositoryNameEnum.HEALTH_CRON_HISTORY_REPOSITORY,
			useClass: CronHistoryPgRepository
		}
	],
})
export class HealthModule {}
