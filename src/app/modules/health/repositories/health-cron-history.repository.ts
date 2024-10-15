export interface IHealthCronHistoryRepository {
	findLastImportedAt (): Promise<Date>;
}