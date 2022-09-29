import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/user.dto';
import { IRequest } from 'src/utils/type';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() user: CreateUserDto) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify')
  async verify(@Req() { user }: IRequest) {
    const auth = await this.authService.verify({ id: user.id });
    if (!auth || auth.id !== user.id) throw new UnauthorizedException();
    return auth;
  }
}
