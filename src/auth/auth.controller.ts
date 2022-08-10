import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ALREADY_REGISTRED_ERROR } from './auth.constants';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly AuthService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: AuthDto) {
    const oldUser = await this.AuthService.findUser(dto.login);
    if (oldUser) {
      throw new BadRequestException(ALREADY_REGISTRED_ERROR);
    }

    return this.AuthService.createUser(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() { login, password }: AuthDto) {
    const { email } = await this.AuthService.validateUser(login, password);
    return this.AuthService.login(email);
  }
}
