import { BcryptConfigService } from './bcrypt-config.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [BcryptConfigService],
  exports: [BcryptConfigService],
})
export class BcryptConfigModule {}
