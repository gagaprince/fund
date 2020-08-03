import { Injectable } from '@nestjs/common';
const Mysql = require('node-mysql-promise');

export interface BasicInfo {
  code: string;
  name: string;
  netWorthDate: string;
  netWorth: number;
  dayGrowth: string;
  expectWorthDate: string;
  expectWorth: number;
  expectGrowth: string;
  lastMonthGrowth: string;
  lastThreeMonthsGrowth: string;
  lastSixMonthsGrowth: string;
  lastYearGrowth: string;
}

@Injectable()
export class DbService {
  mysql: any;

  constructor() {
    this.mysql = Mysql.createConnection({
      host: 'gagalulu.wang',
      user: 'root',
      password: 'ilovelxh123',
      database: 'fund',
    });
  }

  async saveBasicInfo(basicInfo: BasicInfo) {
    return this.mysql
      .table('fund_basic')
      .add(basicInfo)
      .then((insertId) => {
        console.log(insertId);
        console.log(basicInfo);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  async saveBatchBasicInfo(basicInfos: BasicInfo[]) {
    for (let i = 0; i < basicInfos.length; i++) {
      await this.saveBasicInfo(basicInfos[i]);
    }
  }

  async savePositionInfo(positionInfo) {
    return this.mysql
      .table('fund_position')
      .add(positionInfo)
      .then((insertId) => {
        console.log(insertId);
        console.log(positionInfo);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async getBasicInfo(from: number, to: number) {
    return this.mysql
      .table('fund_basic')
      .limit(from, to - from)
      .select();
  }

  async getPositionDatasByCodes(code: string[]) {
    return this.mysql
      .table('fund_position')
      .field('code, stockList')
      .where({ code: ['IN', code.join(',')] })
      .select();
  }
}
