import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthResponseDto } from '../dtos/health-response.dto';
import { HealthService } from '../services/health.service';

@ApiTags('Health')
@Controller()
export class HealthController {
  constructor(
    private readonly healthService: HealthService
  ) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: HealthResponseDto })
  async getHealth(): Promise<HealthResponseDto> {
    return this.healthService.getInfo();
  }
}
