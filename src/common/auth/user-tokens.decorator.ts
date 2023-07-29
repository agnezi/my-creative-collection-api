import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const UserTokens = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.tokens;
  },
);
