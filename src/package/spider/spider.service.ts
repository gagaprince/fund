import { Injectable } from '@nestjs/common';
import { ProxyInterfaceService } from '../proxy-interface/proxy-interface.service';
import { DbService } from '../db/db.service';
import axios from 'axios';

@Injectable()
export class SpiderService {
  constructor(
    private readonly proxyInterfaceService: ProxyInterfaceService,
    private readonly dbService: DbService
  ) {}

  // 获取所有基金代码列表
  // http://fund.eastmoney.com/js/fundcode_search.js
  private async spiderAllFund() {
    const ret = await axios.get(
      'http://fund.eastmoney.com/js/fundcode_search.js'
    );
    let dataStr = ret.data;
    dataStr = dataStr.substring(0, dataStr.length - 1);
    let fundList = JSON.parse(dataStr.split('=')[1].trim());
    fundList = fundList.filter((fund) => fund[2].indexOf('后端') == -1);
    return fundList;
  }

  async spiderFundBasicInfo() {
    setTimeout(async () => {
      const fundList = await this.spiderAllFund();
      const funds = fundList.map((fund) => fund[0]);
      while (funds.length > 0) {
        let executeFunds = funds.splice(0, 10);
        let code = executeFunds.join(',');
        const ret = await this.proxyInterfaceService.proxyBasic(code);
        if (ret.code === 200 && ret.data.length > 0) {
          await this.dbService.saveBatchBasicInfo(ret.data);
        }
      }
    });
    return { taskBegin: true };
  }

  async spiderPosition() {
    setTimeout(async () => {
      let from = 0;
      let page = 100;
      while (true) {
        const ret = await this.dbService.getBasicInfo(from, from + page);
        if (ret.length > 0) {
          for (let i = 0; i < ret.length; i++) {
            const code = ret[i].code;
            const positionDataRet = await this.proxyInterfaceService.proxyPosition(
              code
            );

            if (positionDataRet.code === 200) {
              const positionData = positionDataRet.data;
              const { stockList } = positionData;
              positionData.code = code;
              positionData.stockList = JSON.stringify(stockList);
              await this.dbService.savePositionInfo(positionData);
            }
          }
          from += page;
        } else {
          break;
        }
      }
    });
    return {
      spiderPosition: true,
    };
  }
}
