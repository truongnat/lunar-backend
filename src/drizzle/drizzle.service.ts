import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import type { ConfigType } from '@nestjs/config';
import { databaseConfig } from '../config/config';

@Injectable()
export class DrizzleService implements OnModuleInit {
  private _db: ReturnType<typeof drizzle>;
  private pool: Pool;

  constructor(
    @Inject(databaseConfig.KEY)
    private readonly dbConfig: ConfigType<typeof databaseConfig>,
  ) {
    this.pool = new Pool({
      connectionString: this.dbConfig.url,
    });
    this._db = drizzle(this.pool, { schema });
  }

  async onModuleInit() {
    // Kiểm tra kết nối khi khởi động
    try {
      await this.pool.query('SELECT 1');
      console.log('Database connection established successfully');
    } catch (error) {
      console.error('Failed to connect to database:', error);
    }
  }

  get db(): ReturnType<typeof drizzle> {
    return this._db;
  }
}
