export type CreateManyProductPreloadDto = {
	cronId: number;
	productData: Object[];
}

export interface IProductPreloadRepository {
	createMany(data: CreateManyProductPreloadDto) : Promise<void>;
	findByCronId(cronId: number) : Promise<Object[]>;
	updateImportedAt(cronId: number) : Promise<void>;
}