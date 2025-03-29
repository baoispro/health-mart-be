import { SetMetadata } from '@nestjs/common';

/**
 * Decorator để đặt message tuỳ chỉnh cho API response
 */
export const ResponseMessage = (message: string) =>
  SetMetadata('responseMessage', message);
