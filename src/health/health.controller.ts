import { Controller, Get, Query, Version } from '@nestjs/common';
import { HealthService } from './health.service';
import { LogQueryDto } from './dto/log-query.dto';
import * as process from 'process';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get application health status' })
  @ApiResponse({ status: 200, description: 'Returns the health status of the application' })
  async getHealth() {
    return this.healthService.getHealth();
  }

  @Get('system')
  @Version('1')
  @ApiOperation({ summary: 'Get system information' })
  @ApiResponse({ status: 200, description: 'Returns system information including CPU, memory, and OS details' })
  async getSystemInfo() {
    return this.healthService.getSystemInfo();
  }

  @Get('db')
  @Version('1')
  @ApiOperation({ summary: 'Get database information' })
  @ApiResponse({ status: 200, description: 'Returns database connection status and version information' })
  async getDatabaseInfo() {
    return this.healthService.getDatabaseInfo();
  }

  @Get('logs')
  @Version('1')
  @ApiOperation({ summary: 'Get application logs' })
  @ApiResponse({ status: 200, description: 'Returns application logs with optional limit' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Maximum number of logs to return' })
  async getLogs(@Query() query: LogQueryDto) {
    const logs = await this.healthService.getLogs(query.limit);
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      logs,
    };
  }

  @Get('version')
  @ApiOperation({ summary: 'Get application version' })
  @ApiResponse({ status: 200, description: 'Returns application version information' })
  async getVersion() {
    return this.healthService.getVersion();
  }

  @Get('status')
  @ApiOperation({ summary: 'Get overall application status' })
  @ApiResponse({ status: 200, description: 'Returns overall status of all services' })
  async getStatus() {
    const health = await this.healthService.getHealth();
    const db = await this.healthService.getDatabaseInfo();
    
    return {
      status: db.database.connected ? 'ok' : 'error',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      services: {
        api: { status: 'ok' },
        database: { status: db.database.connected ? 'ok' : 'error' },
      }
    };
  }
}