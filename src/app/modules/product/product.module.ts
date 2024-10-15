import { ProductPgRepository } from '@infra/databases/postgres/repositories/product.repository';
import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { FindProductService } from './services/find-product.service';
import { RepositoryNameEnum } from '../../shared/enums';

@Module({
	imports: [],
	controllers: [ProductController],
	providers: [
		FindProductService,
		{
			provide: RepositoryNameEnum.PRODUCT_REPOSITORY,
			useClass: ProductPgRepository
		}
	],
})
export class ProductModule {}