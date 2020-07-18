import { Test, TestingModule } from '@nestjs/testing';
import { ProxyInterfaceService } from './proxy-interface.service';

describe('ProxyInterfaceService', () => {
  let service: ProxyInterfaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProxyInterfaceService],
    }).compile();

    service = module.get<ProxyInterfaceService>(ProxyInterfaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
