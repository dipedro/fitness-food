import { ApiProperty } from "@nestjs/swagger";

export class FindProductResponseDto {
	@ApiProperty({ example: '0000000000017' })
	code: string;
	@ApiProperty({ example: 'http://world-en.openfoodfacts.org/product/0000000000017/vitoria-crackers' })
	url: string;
	@ApiProperty({ example: 'Vitória crackers' })
	creator: string;
	@ApiProperty({ example: 1620910000 })
	created_t: number;
	@ApiProperty({ example: 1620910000 })
	last_modified_t: number;
	@ApiProperty({ example: 'Vitória crackers' })
	product_name: string;
	@ApiProperty({ example: '200g' })
	quantity: string;
	@ApiProperty({ example: 'Vitória' })
	brands: string;
	@ApiProperty({ example: 'Biscuits' })
	categories: string;
	@ApiProperty({ example: 'Vitória' })
	labels: string;
	@ApiProperty({ example: 'Vitória' })
	cities: string;
	@ApiProperty({ example: 'Vitória' })
	purchase_places: string;
	@ApiProperty({ example: 'Vitória' })
	stores: string;
	@ApiProperty({ example: 'Vitória crackers' })
	ingredients_text: string;
	@ApiProperty({ example: 'Vitória' })
	traces: string;
	@ApiProperty({ example: '200g' })
	serving_size: string;
	@ApiProperty({ example: 200 })
	serving_quantity: number;
	@ApiProperty({ example: 10 })
	nutriscore_score: number;
	@ApiProperty({ example: 'A' })
	nutriscore_grade: string;
	@ApiProperty({ example: 'Biscuits' })
	main_category: string;
	@ApiProperty({ example: 'http://world-en.openfoodfacts.org/images/products/000/000/000/0017/front_en.3.400.jpg' })
	image_url: string;
};