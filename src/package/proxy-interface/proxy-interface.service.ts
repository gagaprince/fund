import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ProxyInterfaceService {
  private async commonGet(url: string) {
    return await axios.get(url, {
      headers: {
        Host: 'api.doctorxiong.club',
        Origin: 'https://www.doctorxiong.club',
        Referer: 'https://www.doctorxiong.club/',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
      },
    });
  }

  async proxyDetail(code: string) {
    const ret = await this.commonGet(
      `https://api.doctorxiong.club/v1/fund/detail?code=${code}`
    ).catch((e) => {
      return { data: null };
    });
    return ret.data;
  }

  async proxyBasic(code: string) {
    const ret = await this.commonGet(
      `https://api.doctorxiong.club/v1/fund?code=${code}`
    ).catch((e) => {
      return { data: null };
    });
    return ret.data;
  }
  async proxyPosition(code: string) {
    const ret = await this.commonGet(
      `https://api.doctorxiong.club/v1/fund/position?code=${code}`
    ).catch((e) => {
      return { data: null };
    });
    return ret.data;
  }
  async proxyHot() {
    const ret = await this.commonGet(
      `https://api.doctorxiong.club/v1/fund/hot`
    ).catch((e) => {
      return { data: null };
    });
    return ret.data;
  }
}
