import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { ProxyInterfaceService } from '../proxy-interface/proxy-interface.service';

@Injectable()
export class AnysisService {
  constructor(
    private readonly dbService: DbService,
    private readonly proxyInterfaceService: ProxyInterfaceService
  ) {}

  private anysisStock(positionDatas) {
    const stockMap = new Map<String, any>();
    positionDatas.forEach(({ stockList }) => {
      const len = stockList.length;
      stockList.forEach((stock, index) => {
        if (index < 4) {
          const stockCode = stock[0];
          const rank = len - index;
          let stockInMap = stockMap.get(stockCode);
          if (stockInMap) {
            stockInMap.rank += rank;
          } else {
            stockInMap = {
              stock,
              rank,
            };
            stockMap.set(stockCode, stockInMap);
          }
        }
      });
    });
    const stockList = [];
    stockMap.forEach((value) => {
      stockList.push(value);
    });
    stockList.sort((stock1, stock2) => {
      return stock2.rank - stock1.rank;
    });

    return stockList;
  }

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
      pageSize: 300,
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

    return this.anysisStock(positionDatas);
  }
}
