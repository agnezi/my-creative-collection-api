import { Controller, Get } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  @Get('health-check')
  health(): string {
    return 'OK';
  }
}
