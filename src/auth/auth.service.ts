import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { AuthLoginEntity, AuthLoginResProblem, AuthLoginResponse } from "../types/auth/auth-login.entity";
import { User } from "../user/user.entity";
import { hashPwd } from "../utils/hash-pwd";
import { v4 as uuid } from 'uuid';
import { sign, verify } from 'jsonwebtoken';
import { JwtPayload } from "./jwt.strategy";
import { AuthConfigConstants } from '../config/authconfig';
import { config } from '../config/configuration';

@Injectable()
export class AuthService {
  private createToken(currentTokenId: string): { accessToken: string, expiresIn: number } {
    const payload: JwtPayload = { id: currentTokenId };
    const expiresIn = 60 * 60 * 24;
    const accessToken = sign(
        payload,
        AuthConfigConstants.secretKeyJwt,
        { expiresIn }
    );
    return {
      accessToken,
      expiresIn,
    };
  };

  private async generateToken(user: User): Promise<string> {
    let token: string;
    let userWithThisToken = null;
    do {
      token = uuid();
      userWithThisToken = await User.findOneBy({ currentTokenId: token });
    } while (!!userWithThisToken);
    user.currentTokenId = token;
    await user.save();

    return token;
  };

  async login(req: AuthLoginEntity, res: Response): Promise<any> {
    try {
      const user = await User.findOneBy({
        email: req.email,
        password: hashPwd(req.password),
      });

      if (!user) {
        return res.json({ 
            isSucces: false,
            message: AuthLoginResProblem.INVALID_LOGIN,
        } as AuthLoginResponse);
      }

      const token = await this.createToken(await this.generateToken(user));

      return res
        .cookie('jwt', token.accessToken, AuthConfigConstants.cookieOptions)
        .json({ 
            isSucces: true,
            login: user.login,
        } as AuthLoginResponse);
    } catch (e) {
        return res.json({ 
            isSucces: false,
            message: e.message,
        } as AuthLoginResponse);
    }
  };

  async logout(user: User, res: Response) {
    try {
        user.currentTokenId = null;
        await user.save();
        res.clearCookie('jwt', AuthConfigConstants.cookieOptions);
        return res.json({
            isSucces: true,
        } as AuthLoginResponse);
    } catch (e) {
        return res.json({ 
            isSucces: false,
            message: e.message,
        } as AuthLoginResponse);
    }
  }

  async islogged(res: Response): Promise<any> {
    return res.json({
        isSucces: true,
    } as AuthLoginResponse);
  }

}
