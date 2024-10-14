import { Module } from "@nestjs/common";
import { RepositoryNameEnum } from "@shared/enums";
import { FetchRequestService } from "./fetch/fetch-request.service";

@Module({
	imports: [],
	providers: [
		{
			provide: RepositoryNameEnum.HTTP_REQUEST_SERVICE,
			useClass: FetchRequestService
		}
	],
	exports: [
		RepositoryNameEnum.HTTP_REQUEST_SERVICE
	]
})
export class HttpRequestModule {}