import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SpiderService {
  async spiderFundBasicInfo() {
    const ret = await axios.get(
      'https://api.doctorxiong.club/v1/fund/detail?code=000962'
    );
    console.log(ret);
    return ret.data;
  }
}
