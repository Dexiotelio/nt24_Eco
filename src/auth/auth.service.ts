import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from 'src/dto/user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { hashData, verifyHashedData } from 'src/until/hashData';

@Injectable()
export class AuthServices {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async SingUp(user: UserDto) {
    try {
      const { firstname, lastname, email, password } = user;
      if (!(firstname && lastname && email && password)) {
        throw Error('Empy input fields');
      } else if (
        !(/^[a-zA-Z]*$/.test(firstname) && /^[a-zA-Z]*$/.test(lastname))
      ) {
        throw Error('Invalid name entered');
      } else if (!/^[\w-\.]+@([\w-]+\.)+[\w]{2,4}$/.test(email)) {
        throw Error('Invalid email entered');
      } else if (password.length < 8) {
        throw Error('Password is too short');
      } else {
        const existinUser = await this.usersService.FindOne(user.email);
        if (existinUser) {
          throw Error('User with the provided email already existes');
        }
        const hashedPassword = await hashData(password);
        const createdUser = { ...user, password: hashedPassword };
        if (hashedPassword) {
          const newUser = this.usersService.CreateUser(createdUser);
          return newUser;
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  async SingIn(email: string, password: string): Promise<{ token: string }> {
    try {
      const user = await this.usersService.FindOne(email);
      if (!user) {
        throw Error('Email not found');
      }
      const match = await verifyHashedData(password, user.password);
      if (!match) {
        throw new UnauthorizedException();
      }
      const payload = { id: user.id };
      return {
        token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}
