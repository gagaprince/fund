import { Controller, Get } from '@nestjs/common';
import { SpiderService } from './spider.service';
import { SpiderModule } from './spider.module';

@Controller('spider')
export class SpiderController {
  constructor(private readonly spiderService: SpiderService) {}
  @Get('/')
  async beginTask() {
    return this.spiderService.spiderFundBasicInfo();
  }

  @Get('/position')
  async position() {
    return this.spiderService.spiderPosition();
  }
}
