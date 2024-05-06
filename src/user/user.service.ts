import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from 'src/dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async CreateUser(user: UserDto): Promise<User> {
    const { firstname, lastname, email, password } = user;
    try {
      const newUser = await this.userRepository.create({
        firstname,
        lastname,
        email,
        password,
      });
      const createdUser = this.userRepository.save(newUser);
      return createdUser;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  async FindOne(email: string): Promise<User> {
    try {
      const existinUser = await this.userRepository.findOne({
        where: {
          email,
        },
      });
      return existinUser;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}
