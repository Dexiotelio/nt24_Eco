import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserDto } from 'src/dto/user.dto';
import { AuthServices } from 'src/auth/auth.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authServices: AuthServices) {}

  @Post('singup')
  async createUser(@Body() newUser: UserDto) {
    try {
      return this.authServices.SingUp(newUser);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async singIn(@Body() user: UserDto) {
    try {
      return this.authServices.SingIn(user.email, user.password);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  // Patch
  // Delete
}
