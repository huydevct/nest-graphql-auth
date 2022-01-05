import { User } from './../users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserInput } from './dto/login-user.input';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    const valid = await bcrypt.compare(password, user.password);

    if (user && valid) {
      //TODO: make more secure
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  //   async login(loginUserInput: LoginUserInput) {
  async login(user: User) {
    // const user = await this.usersService.findOne(loginUserInput.username);
    // const { password, ...result } = user;

    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }), //TODO: implement jwt,
      user,
      //   user: result,
    };
  }

  async signup(loginUserInput: LoginUserInput) {
    const user = this.usersService.findOne(loginUserInput.username);

    if (user) {
      throw new Error('User already exist!');
    }

    const password = await bcrypt.hash(loginUserInput.password, 10);

    return this.usersService.create({
      ...loginUserInput,
      password,
    });
  }
}
