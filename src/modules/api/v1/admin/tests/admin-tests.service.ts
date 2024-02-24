import { Injectable } from '@nestjs/common';
import {
    IAdminTestsService,
} from '@/domain/services/admin/tests/admin-tests-service.interface';
import {
    MongoAdminTestsService,
} from '@/domain/services/admin/tests/implementations/mongo-admin-tests.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TestModel } from '@/db/mongoose/test/test.model';
import { MongoConverterService } from '@/modules/services/mongo/mongo-converter.service';


@Injectable()
export class AdminTestsService {
    private readonly _adminTestsService: IAdminTestsService;

    constructor (
        @InjectModel('TestModel') private readonly _testRepository: Model<TestModel>,
        private readonly _converter: MongoConverterService,
    ) {
        this._adminTestsService = new MongoAdminTestsService(
            this._testRepository,
            this._converter.test,
            this._converter.adminTestShort,
            this._converter.adminThemeShort,
            this._converter.adminQuestionShort,
            this._converter.filter,
        );
    }

    public getOneById (id: string) {
        return this._adminTestsService.getOneById(id);
    }

    // TODO: All
    public getMany () {
        return this._adminTestsService.getList({}, {});
    }
}