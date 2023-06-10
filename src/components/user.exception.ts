/*
https://docs.nestjs.com/exception-filters#custom-exceptions
*/

import { HttpException, HttpStatus } from '@nestjs/common';

export class UserException extends HttpException {
  constructor() {
    super('User', HttpStatus.FORBIDDEN);
  }
}
