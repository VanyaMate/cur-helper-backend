import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ITestService } from '@/domain/test/test-service.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TestModel } from '@/db/mongoose/test/test.model';
import {
    DtoValidatorService,
} from '@/modules/services/dto-validator/dto-validator.service';
import {
    MongoFilterConverterService,
} from '@/modules/services/mongo/mongo-filter-converter.service';
import { MongoTestService } from '@/domain/test/implementations/mongo/mongo-test-service';
import {
    MongoTestConverter,
} from '@/domain/test/implementations/mongo/mongo-test.converter';
import { TestCreateType, TestUpdateType } from '@/domain/test/test.types';
import { TestCreateDto } from '@/domain/test/dto/test-create.dto';
import { TestUpdateDto } from '@/domain/test/dto/test-update.dto';
import { ThemeModel } from '@/db/mongoose/theme/theme.model';


@Injectable()
export class TestService {
    private readonly _testService: ITestService;

    constructor (
        @InjectModel('TestModel') private readonly _testModel: Model<TestModel>,
        @InjectModel('ThemeModel') private readonly _themeModel: Model<ThemeModel>,
        private readonly _dtoValidator: DtoValidatorService,
        private readonly _mongoFilterConverter: MongoFilterConverterService,
    ) {
        this._testService = new MongoTestService(
            this._testModel,
            this._themeModel,
            new MongoTestConverter(),
            this._mongoFilterConverter,
        );
    }

    async create (data: TestCreateType) {
        try {
            await this._dtoValidator.validate(new TestCreateDto(data));
            return await this._testService.create(data);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    async updateById (id: string, data: TestUpdateType) {
        try {
            await this._dtoValidator.validate(new TestUpdateDto(data));
            return await this._testService.update(id, data);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    async getById (id: string) {
        try {
            return await this._testService.read({ id: { value: id, type: 'equal' } });
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    async deleteById (id: string) {
        try {
            return await this._testService.delete(id);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }
}