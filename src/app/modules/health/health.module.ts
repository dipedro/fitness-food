import { HealthPgRepository } from '@databases/postgres/repositories/health.repository';
import { Module } from '@nestjs/common';
import { RepositoryNameEnum } from '@shared/enums';
import { HealthController } from './controllers/health.controller';
import { HealthService } from './services/health.service';

@Module({
	imports: [],
  	controllers: [HealthController],
  	providers: [
		HealthService,
		{
			provide: RepositoryNameEnum.HEALTH_REPOSITORY,
			useClass: HealthPgRepository
		}
	],
})
export class HealthModule {}
