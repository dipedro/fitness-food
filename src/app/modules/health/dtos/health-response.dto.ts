export type HealthResponseDto = {
	database: {
	  read: string;
	  write: string;
	},
	api: {
	  memory: string;
	  lastCronExecution: string;
	  onlineTime: string;
	}
}