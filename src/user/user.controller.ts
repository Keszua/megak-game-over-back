import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserRegisterEntity, UserRegisterResponse } from '../../src/types';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        @Inject(UserService) private userService: UserService,
    ) { }


    @Post('/register')
    register(
        @Body() newUser: UserRegisterEntity,
    ): Promise<UserRegisterResponse> {
        return this.userService.register(newUser);
    }

}
