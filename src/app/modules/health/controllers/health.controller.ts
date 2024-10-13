import { Controller, Get, HttpStatus } from '@nestjs/common';
import { HealthResponseDto } from '../dtos/health-response.dto';
import { HealthService } from '../services/health.service';
import { ApiResponse } from '@nestjs/swagger';


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
