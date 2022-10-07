import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/database/user/user.service';

interface IAuthCreate {
  name: string;
}
interface IAuthVerify {
  id: string;
}
interface IAuthUpdate extends IAuthCreate, IAuthVerify {
  name: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async login(param: IAuthCreate) {
    const { id, name } = await this.usersService.create(param);
    const user = { id, name };
    return {
      accessToken: this.jwtService.sign(user),
      user,
    };
  }

  verify({ id }: IAuthVerify) {
    return this.usersService.findOne(id);
  }

  async update(param: IAuthUpdate) {
    return this.usersService.update(param);
  }
}
