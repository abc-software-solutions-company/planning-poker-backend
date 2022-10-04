import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/database/user/user.dto';
import { UsersService } from 'src/database/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async login(param: CreateUserDto) {
    const { id, name } = await this.usersService.create(param);
    const user = { id, name };
    return {
      accessToken: this.jwtService.sign(user),
      user,
    };
  }
  verify({ id }: { id: string }) {
    return this.usersService.findOne(id);
  }
}
