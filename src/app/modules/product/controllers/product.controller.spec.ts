import { ProductInMemoryRepository } from "@infra/databases/in-memory/repositories/product.repository";
import { Test, TestingModule } from "@nestjs/testing";
import { DeleteProductService } from "../services/delete-product.service";
import { FindProductService } from "../services/find-product.service";
import { FindProductsService } from "../services/find-products.service";
import { UpdateProductService } from "../services/update-product.service";
import { ProductController } from "./product.controller";

describe('ProductController', () => {
	let productController: ProductController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [ProductController],
			providers: [
				FindProductService,
				FindProductsService,
				UpdateProductService,
				DeleteProductService,
				{
					provide: 'IProductRepository',
					useClass: ProductInMemoryRepository 
				}
			],
		})
		.compile();

		productController = app.get<ProductController>(ProductController);
	});

	it('should be defined', () => {
		expect(productController).toBeDefined();
	});

	it('should return not found exception with Product not found message', () => {
		expect(productController.getProduct('code')).rejects.toThrow('Product not found');
	});

	it('should return no content status', () => {
		expect(productController.deleteProduct('code')).resolves.toBeUndefined();
	});

	it('should return no content status', () => {
		expect(productController.updateProduct('code', {
			url: "",
			creator: "",
			product_name: "",
			quantity: "",
			brands: "",
			categories: "",
			labels: "",
			cities: "",
			purchase_places: "",
			stores: "",
			ingredients_text: "",
			traces: "",
			serving_size: "",
			serving_quantity: 0,
			nutriscore_score: 0,
			nutriscore_grade: "",
			main_category: "",
			image_url: ""
		})).resolves.toBeUndefined();
	});
});
