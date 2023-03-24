import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegisterProblem, UserRegisterResponse } from '../types/user/user';
import { Repository } from 'typeorm';
import { UserRegisterEntity } from '../types/user/register.entity';
import { User } from './user.entity';
import { hashPwd } from '../utils/hash-pwd';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async register(newUser: UserRegisterEntity): Promise<UserRegisterResponse> {
        const { email, password, login } = newUser;

        console.log(email, password, login);

        if (   email === ''    || email === undefined
            || password === '' || password === undefined
            || login === ''    || login === undefined) {
            return {
                isSucces: false,
                message: UserRegisterProblem.DATA_IS_MISSING,
            }
        }

        if (password.length < 6) {
            return {
                isSucces: false,
                message: UserRegisterProblem.PASS_IS_TO_SHORT,
            }
        }

        let existUser = await this.userRepository.findOne({ where: { email } });
        if (existUser) {
            return {
                isSucces: false,
                message: UserRegisterProblem.USER_IS_EXIST,
            }
        }

        const user = new User();
        user.email = email;
        user.password = hashPwd(password);
        user.login = login;    
        await user.save();

        return {
            isSucces: true,
        }
    }

}