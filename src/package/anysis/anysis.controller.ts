import { Controller, Get } from '@nestjs/common';
import { AnysisService } from './anysis.service';

@Controller('anysis')
export class AnysisController {
  constructor(private readonly anysisService: AnysisService) {}

  @Get('/hotstock')
  async hotstock() {
    return await this.anysisService.getHotStock();
  }
}
