import { Global, Module } from '@nestjs/common';
import { DatabasePgService } from './postgres/database-pg.service';


@Global()
@Module({
    providers: [
        {
			provide: 'IDatabaseService',
			useClass: DatabasePgService
		}
    ],
    exports: ['IDatabaseService'],
})
export class DatabaseModule {}
