import { Module } from '@nestjs/common';
import { ProxyInterfaceController } from './proxy-interface.controller';
import { ProxyInterfaceService } from './proxy-interface.service';

@Module({
  controllers: [ProxyInterfaceController],
  providers: [ProxyInterfaceService],
  exports: [ProxyInterfaceService],
})
export class ProxyInterfaceModule {}
