import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductRequestDTO {

	@ApiProperty({ example: 'http://world-en.openfoodfacts.org/product/0000000000017/vitoria-crackers' })
	@IsOptional()
	@IsString()
	url: string;

	@ApiProperty({ example: 'Vitória crackers' })
	@IsOptional()
	creator: string;

	@ApiProperty({ example: 'Vitória crackers' })
	@IsOptional()
	@IsString()
	product_name: string;

	@ApiProperty({ example: '200g' })
	@IsOptional()
	@IsString()
	quantity: string;

	@ApiProperty({ example: 'Vitória' })
	@IsOptional()
	@IsString()
	brands: string;

	@ApiProperty({ example: 'Biscuits' })
	@IsOptional()
	@IsString()
	categories: string;

	@ApiProperty({ example: 'Vitória' })
	@IsOptional()
	@IsString()
	labels: string;

	@ApiProperty({ example: 'Vitória' })
	@IsOptional()
	@IsString()
	cities: string;

	@ApiProperty({ example: 'Vitória' })
	@IsOptional()
	@IsString()
	purchase_places: string;

	@ApiProperty({ example: 'Vitória' })
	@IsOptional()
	@IsString()
	stores: string;

	@ApiProperty({ example: 'Vitória crackers' })
	@IsOptional()
	@IsString()
	ingredients_text: string;

	@ApiProperty({ example: 'Vitória' })
	@IsOptional()
	@IsString()
	traces: string;

	@ApiProperty({ example: '200g' })
	@IsOptional()
	@IsString()
	serving_size: string;

	@ApiProperty({ example: 200 })
	@IsOptional()
	@IsNumber()
	serving_quantity: number;

	@ApiProperty({ example: 10 })
	@IsOptional()
	@IsNumber()
	nutriscore_score: number;

	@ApiProperty({ example: 'A' })
	@IsOptional()
	@IsString()
	nutriscore_grade: string;

	@ApiProperty({ example: 'Biscuits' })
	@IsOptional()
	@IsString()
	main_category: string;

	@ApiProperty({ example: 'http://world-en.openfoodfacts.org/images/products/000/000/000/0017/front_en.3.400.jpg' })
	@IsOptional()
	@IsString()
	image_url: string;

}