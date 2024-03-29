import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pool } from './pool.entity';

@Injectable()
export class PoolsService {
  constructor(
    @InjectRepository(Pool)
    private readonly poolsRepository: Repository<Pool>,
  ) {}

  generateId(len: number) {
    const pool = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let index = 0; index < len; index++) {
      const r = Math.floor(Math.random() * pool.length);
      id = id + pool[r];
    }
    return id;
  }

  async generate(num: number) {
    const pools = [];
    let i = 0;
    while (i < num) {
      const pool = new Pool();
      pool.id = this.generateId(5);
      pool.isUsed = false;
      const save = await this.poolsRepository.save(pool);
      if (save) {
        i = i + 1;
        pools.push(save);
      }
    }
    return pools;
  }

  getOne(): Promise<Pool> {
    return this.poolsRepository.findOneBy({ isUsed: false });
  }

  async use(id: string) {
    const pool = await this.poolsRepository.findOneBy({ id });
    pool.isUsed = true;
    return this.poolsRepository.save(pool);
  }

  async status() {
    const usage = (await this.poolsRepository.findBy({ isUsed: true })).length;
    const all = (await this.poolsRepository.find()).length;
    const UsageRate = ((usage * 100) / all || 0).toFixed(2);
    return {
      all,
      usage,
      UsageRate: UsageRate + ' %',
    };
  }
}
