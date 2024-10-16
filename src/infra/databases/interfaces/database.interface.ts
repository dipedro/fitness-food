import { OnModuleDestroy } from "@nestjs/common";

export interface IDatabaseService extends OnModuleDestroy {
	query(query: string, values?: any[]): Promise<any>;
}