import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpiderModule } from './package/spider/spider.module';
import { ProxyInterfaceModule } from './package/proxy-interface/proxy-interface.module';

@Module({
  imports: [SpiderModule, ProxyInterfaceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
