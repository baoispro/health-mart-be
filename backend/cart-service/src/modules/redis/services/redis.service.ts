import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit {
  private client: Redis;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const host = this.configService.get<string>('REDIS_HOST', 'localhost');
    const port = Number(this.configService.get<number>('REDIS_PORT', 6379));

    this.client = new Redis({ host, port });
  }

  async get(key: string) {
    return this.client.get(key);
  }

  async set(key: string, value: string) {
    return this.client.set(key, JSON.stringify(value));
  }

  async del(key: string) {
    return this.client.del(key);
  }
}
