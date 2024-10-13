import { ApiProperty } from "@nestjs/swagger";

class DatabaseResponseDto {
	@ApiProperty({ example: 'ok' })
	read: string;
	@ApiProperty({ example: 'ok' })
	write: string;
}

class ApiResponseDto {
	@ApiProperty({ example: '100MB' })
	memory: string;
	@ApiProperty({ example: '2021-10-01 00:00:00' })
	lastCronExecution: string;
	@ApiProperty({ example: '120 seconds' })
	onlineTime: string;
}

export class HealthResponseDto {
	@ApiProperty({ type: DatabaseResponseDto })
	database: DatabaseResponseDto;
	@ApiProperty({ type: ApiResponseDto })
	api: ApiResponseDto;
}