import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

export function Auth() {
  return applyDecorators(UseGuards(AuthGuard), ApiBearerAuth());
}
