import { Module } from '@nestjs/common';
import { SpiderController } from './spider.controller';
import { SpiderService } from './spider.service';
import { ProxyInterfaceModule } from '../proxy-interface/proxy-interface.module';
import { DbModule } from '../db/db.module';

@Module({
  imports: [ProxyInterfaceModule, DbModule],
  controllers: [SpiderController],
  providers: [SpiderService],
})
export class SpiderModule {}
