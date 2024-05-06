import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDocument, UserModel } from '@/db/mongoose/user/user.model';
import { InjectModel } from '@nestjs/mongoose';
import {
    MongoConverterService,
} from '@/modules/services/mongo/mongo-converter.service';
import { UserProfileData } from '@vanyamate/cur-helper-types/types/users';


@Injectable()
export class UsersService {

    constructor (
        @InjectModel('UserModel') private readonly _userModel: Model<UserModel>,
        private readonly _converters: MongoConverterService,
    ) {
    }

    async getUserDataByLogin (login: string): Promise<UserProfileData> {
        try {
            const user: UserDocument = await this._userModel.findOne({ login }, {}, {
                populate: [
                    {
                        path    : 'tests',
                        populate: [
                            {
                                path    : 'test',
                                populate: 'theme',
                            },
                        ],
                        options : {
                            sort: {
                                finishTime: -1,
                            },
                        },
                    },
                ],
            });

            return {
                user        : this._converters.user.to(user),
                testsResults: user.tests.map((testResult) => this._converters.testResultShort.to(testResult)),
            };
        } catch (e) {
            console.log(e);
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

}