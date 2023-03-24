import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthLoginEntity } from "../types/auth/auth-login.entity";
import { AuthGuard } from "@nestjs/passport";
import { UserObj } from "../decorators/user-obj.decorator";
import { User } from "../user/user.entity";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {

  }

  @Post('/login')
  async phoneRegister(
    @Body() req: AuthLoginEntity,
    @Res() res: Response,
  ): Promise<any> {
    return this.authService.login(req, res);
  }

  @Get('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@UserObj() user: User, @Res() res: Response) {
    return this.authService.logout(user, res);
  }

}
