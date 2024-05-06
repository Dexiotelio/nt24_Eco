import { Controller, Get } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userServices: UserService) {}

  @Get('hello')
  hello() {
    return 'hello';
  }
}
