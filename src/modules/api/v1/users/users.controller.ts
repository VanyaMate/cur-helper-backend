import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from '@/modules/api/v1/users/users.service';


@Controller('api/v1/users')
export class UsersController {

    constructor (private readonly usersService: UsersService) {
    }

    @Get('/:login')
    getUserData (@Param('login') login: string) {
        return this.usersService.getUserDataByLogin(login);
    }

}