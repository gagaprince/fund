import { Controller, Get, Query } from '@nestjs/common';
import { ProxyInterfaceService } from './proxy-interface.service';

interface ICommonQuery {
  code: string;
}

@Controller('/fund')
export class ProxyInterfaceController {
  constructor(private readonly proxyInterfaceService: ProxyInterfaceService) {}
  @Get('/detail')
  async proxyDetail(@Query() query: ICommonQuery) {
    const { code } = query;
    return this.proxyInterfaceService.proxyDetail(code);
  }
  @Get('/basic')
  async proxyBasic(@Query() query: ICommonQuery) {
    const { code } = query;
    return this.proxyInterfaceService.proxyBasic(code);
  }
  @Get('/position')
  async proxyPosition(@Query() query: ICommonQuery) {
    const { code } = query;
    return this.proxyInterfaceService.proxyPosition(code);
  }
  @Get('/hot')
  async proxyHot() {
    return this.proxyInterfaceService.proxyHot();
  }
}
