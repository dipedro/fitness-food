export interface IHealthRepository {
	getReadStatus(): Promise<string>;
	getWriteStatus(): Promise<string>;
}