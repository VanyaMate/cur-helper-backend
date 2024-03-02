import { Injectable } from '@nestjs/common';
import {
    IAdminQuestionsService,
} from '@/domain/services/admin/questions/admin-questions-service.interface';
import {
    MongoAdminQuestionsService,
} from '@/domain/services/admin/questions/implementations/mongo/mongo-admin-questions.service';
import { Model } from 'mongoose';
import { QuestionModel } from '@/db/mongoose/question/question.model';
import { MongoConverterService } from '@/modules/services/mongo/mongo-converter.service';
import { InjectModel } from '@nestjs/mongoose';
import {
    QuestionToTestModel,
} from '@/db/mongoose/question-to-test/question-to-test.model';
import {
    QuestionToThemeModel,
} from '@/db/mongoose/question-to-theme/question-to-theme.model';


@Injectable()
export class AdminQuestionsService {
    private readonly _adminQuestionService: IAdminQuestionsService;

    constructor (
        @InjectModel('QuestionModel') private readonly _questionRepository: Model<QuestionModel>,
        @InjectModel('QuestionToTestModel') private readonly _questionToTestRepository: Model<QuestionToTestModel>,
        @InjectModel('QuestionToThemeModel') private readonly _questionToThemeRepository: Model<QuestionToThemeModel>,
        private readonly _converter: MongoConverterService,
    ) {
        this._adminQuestionService = new MongoAdminQuestionsService(
            this._questionRepository,
            this._questionToTestRepository,
            this._questionToThemeRepository,
            this._converter.question,
            this._converter.questionAnswer,
            this._converter.adminQuestionShort,
            this._converter.adminThemeShort,
            this._converter.adminTestShort,
            this._converter.filter,
        );
    }

    public async findOne (id: string) {
        return this._adminQuestionService.findOneById(id);
    }

    public async findMany () {
        return this._adminQuestionService.findMany({}, {});
    }

    public async findManyUnlinkedForTest (testId: string) {
        return this._adminQuestionService.findManyUnlinkedForTest(testId, {}, {});
    }
}