import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { ProxyInterfaceService } from '../proxy-interface/proxy-interface.service';

@Injectable()
export class AnysisService {
  constructor(
    private readonly dbService: DbService,
    private readonly proxyInterfaceService: ProxyInterfaceService
  ) {}
  async getHotStock() {
    // 获取排名前100 的基金
    const fundListRet = await this.proxyInterfaceService.proxyRank({
      fundType: ['gp', 'hh'],
      sort: '3y',
      fundCompany: [],
      createTimeLimit: 0,
      fundScale: 0,
      asc: 0,
      pageIndex: 1,
      pageSize: 100,
    });
    const fundList = fundListRet.data.rank;
    // 计算持仓排名
    const codes = fundList.map((fund) => fund.code);

    let positionDatas = await this.dbService.getPositionDatasByCodes(codes);
    positionDatas = positionDatas.map((positionData) => {
      const { stockList } = positionData;
      try {
        positionData.stockList = JSON.parse(stockList);
      } catch (e) {
        console.log(stockList);
      }

      return positionData;
    });

    return positionDatas;
  }
}
