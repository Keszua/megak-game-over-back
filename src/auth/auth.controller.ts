import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthLoginEntity, AuthLoginResponse } from "../types/auth/auth-login.entity";
import { AuthGuard } from "@nestjs/passport";
import { UserObj } from "../decorators/user-obj.decorator";
import { User } from "../user/user.entity";

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {

  }

  @Post('/login')
  async phoneRegister(
    @Body() req: AuthLoginEntity,
    @Res() res: Response,
  ): Promise<AuthLoginResponse> {
    return this.authService.login(req, res);
  }

  @Get('/logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@UserObj() user: User, @Res() res: Response) {
    return this.authService.logout(user, res);
  }

  @Get('/islogged')
  async islogged(@Req() req: any, @Res() res: Response) {
    return this.authService.islogged(req, res);
  }
}
