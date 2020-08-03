import { Module } from '@nestjs/common';
import { AnysisController } from './anysis.controller';
import { AnysisService } from './anysis.service';
import { DbModule } from '../db/db.module';
import { ProxyInterfaceModule } from '../proxy-interface/proxy-interface.module';

@Module({
  imports: [DbModule, ProxyInterfaceModule],
  controllers: [AnysisController],
  providers: [AnysisService],
})
export class AnysisModule {}
