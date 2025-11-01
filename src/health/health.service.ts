import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import * as os from 'os';
import * as process from 'process';
import {
  HealthResponse,
  SystemInfoResponse,
  DatabaseInfoResponse,
  VersionInfoResponse,
} from './interfaces/health-response.interface';
import { sql } from 'drizzle-orm';
import packageJson from '../../package.json';	

@Injectable()
export class HealthService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async getHealth(): Promise<HealthResponse> {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }

  async getSystemInfo(): Promise<SystemInfoResponse> {
    const cpus = os.cpus();
    const cpuUsage = process.cpuUsage();
    const totalCpuUsage = cpuUsage.user + cpuUsage.system;

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      os: {
        type: os.type(),
        platform: os.platform(),
        release: os.release(),
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        cpuUsage: totalCpuUsage,
      },
      process: {
        pid: process.pid,
        memoryUsage: process.memoryUsage(),
      },
    };
  }

  async getDatabaseInfo(): Promise<DatabaseInfoResponse> {
    let dbStatus = true;
    let dbVersion = '';
    let connectionDetails = {} as DatabaseInfoResponse['database']['connectionPool'];
    let responseTime = 0;

    try {
      const startTime = Date.now();

      // Thực hiện truy vấn để kiểm tra kết nối và lấy thông tin chi tiết
      const versionResult = await this.drizzleService.db.execute(
        sql`SELECT version()`,
      );
      const dbSizeResult = await this.drizzleService.db.execute(sql`
        SELECT pg_size_pretty(pg_database_size(current_database())) as size
      `);
      const activeConnectionsResult = await this.drizzleService.db.execute(sql`
        SELECT count(*) as connections FROM pg_stat_activity
      `);

      responseTime = Date.now() - startTime;
      dbVersion = versionResult[0]?.version || 'Unknown';

      connectionDetails = {
        databaseSize: dbSizeResult[0]?.size || 'Unknown',
        activeConnections: activeConnectionsResult[0]?.connections || 0,
        responseTimeMs: responseTime,
      };
    } catch (error) {
      dbStatus = false;
      dbVersion = 'Connection failed';
      connectionDetails = {
        error: error.message,
      };
    }

    return {
      status: dbStatus ? 'ok' : 'error',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: {
        type: 'PostgreSQL',
        version: dbVersion,
        connected: dbStatus,
        connectionPool: connectionDetails,
      },
    };
  }

  async getVersion(): Promise<VersionInfoResponse> {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: packageJson.version,
      name: packageJson.name,
      description: packageJson.description,
    };
  }

  async getLogs(
    limit: number = 10,
  ): Promise<{ level: string; timestamp: string; message: string }[]> {
    // Đọc logs từ file thực tế
    try {
      const fs = require('fs');
      const path = require('path');

      // Đường dẫn đến file log
      const logPath = path.join(process.cwd(), 'logs', 'combined.log');

      if (!fs.existsSync(logPath)) {
        return [
          {
            level: 'warn',
            timestamp: new Date().toISOString(),
            message: 'Log file not found',
          },
        ];
      }

      // Đọc nội dung file log
      const content = fs.readFileSync(logPath, 'utf8');
      const lines = content.trim().split('\n');

      // Lấy số dòng theo limit, từ cuối file (logs mới nhất)
      const logEntries = lines
        .slice(Math.max(0, lines.length - limit))
        .map((line) => {
          try {
            const parsed = JSON.parse(line);
            return {
              level: parsed.level || 'info',
              timestamp: parsed.timestamp || new Date().toISOString(),
              message: parsed.message || line,
            };
          } catch (e) {
            // Nếu không parse được JSON, trả về dòng gốc
            return {
              level: 'info',
              timestamp: new Date().toISOString(),
              message: line,
            };
          }
        })
        .reverse(); // Đảo ngược để hiển thị log mới nhất trước

      return logEntries;
    } catch (error) {
      // Trả về thông báo lỗi nếu không đọc được file
      return [
        {
          level: 'error',
          timestamp: new Date().toISOString(),
          message: `Error reading logs: ${error.message}`,
        },
      ];
    }
  }
}
