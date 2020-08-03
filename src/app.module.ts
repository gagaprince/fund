import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpiderModule } from './package/spider/spider.module';
import { ProxyInterfaceModule } from './package/proxy-interface/proxy-interface.module';
import { DbModule } from './package/db/db.module';
import { AnysisModule } from './package/anysis/anysis.module';

@Module({
  imports: [SpiderModule, ProxyInterfaceModule, DbModule, AnysisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
