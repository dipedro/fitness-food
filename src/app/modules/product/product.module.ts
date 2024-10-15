import { ProductPgRepository } from '@infra/databases/postgres/repositories/product.repository';
import { Module } from '@nestjs/common';
import { RepositoryNameEnum } from '../../shared/enums';
import { ProductController } from './controllers/product.controller';
import { FindProductService } from './services/find-product.service';
import { FindProductsService } from './services/find-products.service';

@Module({
	imports: [],
	controllers: [ProductController],
	providers: [
		FindProductService,
		FindProductsService,
		{
			provide: RepositoryNameEnum.PRODUCT_REPOSITORY,
			useClass: ProductPgRepository
		}
	],
})
export class ProductModule {}