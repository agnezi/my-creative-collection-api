import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

export function Auth() {
  return applyDecorators(
    UseGuards(AuthGuard),
    ApiBearerAuth(),
    ApiHeader({
      name: 'x-user-token',
      required: true,
      allowEmptyValue: false,
      description: 'Custom token with user information',
    }),
    ApiHeader({
      name: 'x-refresh-token',
      required: true,
      allowEmptyValue: false,
      description: 'User refresh token',
    }),
  );
}
