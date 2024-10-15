export interface ICronHistoryRepository {
	create (): Promise<number>;
	updateImportedAt (cronId: number): Promise<void>;
}