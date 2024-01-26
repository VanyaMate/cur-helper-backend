import { Inject, Injectable } from '@nestjs/common';
import { ITestsService } from '@/domain/tests/tests-service.interface';
import {
    MongoTestsService,
} from '@/domain/tests/implementations/mongo/mongo-tests.service';
import { InjectModel } from '@nestjs/mongoose';
import { Test } from '@/domain/test/implementations/mongo/mongo-test.model';
import { Model } from 'mongoose';
import {
    MongoTestConverter,
} from '@/domain/test/implementations/mongo/mongo-test.converter';


@Injectable()
export class TestService {
    private _testsService: ITestsService;

    constructor (
        @InjectModel(Test.name) private readonly _model: Model<Test>,
    ) {
        this._testsService = new MongoTestsService(
            this._model,
            new MongoTestConverter(),
        );
    }

    async getAll () {
        return this._testsService.getAllWithResults('', {}, {});
    }
}