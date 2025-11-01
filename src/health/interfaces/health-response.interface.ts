export interface HealthResponse {
  status: string;
  timestamp: string;
  uptime: number;
}

export interface SystemInfoResponse extends HealthResponse {
  os: {
    type: string;
    platform: string;
    release: string;
    totalMemory: number;
    freeMemory: number;
    cpuUsage: number;
  };
  process: {
    pid: number;
    memoryUsage: {
      rss: number;
      heapTotal: number;
      heapUsed: number;
      external: number;
    };
  };
}

export interface DatabaseInfoResponse extends HealthResponse {
  database: {
    type: string;
    version: string;
    connected: boolean;
    connectionPool?: Partial<{
      databaseSize: number;
      activeConnections: number;
      responseTimeMs: number;
      error: string
    }>;
  };
}

export interface LogInfoResponse extends HealthResponse {
  logs: {
    level: string;
    timestamp: string;
    message: string;
  }[];
}

export interface VersionInfoResponse extends HealthResponse {
  version: string;
  name: string;
  description: string;
}