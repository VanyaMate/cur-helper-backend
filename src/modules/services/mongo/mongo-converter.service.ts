import { Injectable } from '@nestjs/common';
import { Filter, IConverter } from '@/domain/service.types';
import { FilterQuery } from 'mongoose';
import {
    MongoFilterConverter,
} from '@/domain/converters/mongo/mongo-filter.converter';
import { MongoThemeConverter } from '@/domain/converters/mongo/mongo-theme.converter';
import { ThemeDocument } from '@/db/mongoose/theme/theme.model';
import { ThemeShortType, ThemeType } from '@/domain/services/theme/theme.types';
import { MongoTestConverter } from '@/domain/converters/mongo/mongo-test.converter';
import {
    MongoQuestionAnswerConverter,
} from '@/domain/converters/mongo/mongo-question-answer.converter';
import {
    MongoQuestionConverter,
} from '@/domain/converters/mongo/mongo-question.converter';
import { TestDocument } from '@/db/mongoose/test/test.model';
import { TestType } from '@/domain/services/test/test.types';
import {
    QuestionAnswerDocument,
} from '@/db/mongoose/question-answer/question-answer.model';
import { QuestionAnswerType } from '@/domain/services/answer/question-answer.types';
import { QuestionDocument } from '@/db/mongoose/question/question.model';
import {
    QuestionResult,
    QuestionSelect, QuestionThemes,
    QuestionType,
} from '@/domain/services/question/question.types';
import {
    MongoThemesChildrenConverter, ThemeChildrenConverterType,
} from '@/domain/converters/mongo/mongo-themes-children.converter';
import {
    ThemeChildren,
    ThemeRecursiveChildren,
} from '@/domain/services/themes/themes.types';
import {
    MongoThemeShortConverter,
} from '@/domain/converters/mongo/mongo-theme-short.converter';
import { With } from '@/domain/types';
import { UserDocument } from '@/db/mongoose/user/user.model';
import { UserType } from '@/domain/services/user/user.types';
import { RoleDocument } from '@/db/mongoose/role/role.model';
import { RoleType } from '@/domain/services/role/role.types';
import {
    MongoUserTypeConverter,
} from '@/domain/converters/mongo/mongo-user-type.converter';
import {
    MongoRoleConverter,
} from '@/domain/services/role/implementations/mongo/mongo-role.converter';
import { TestPassingDocument } from '@/db/mongoose/test-passing/test-passing.model';
import {
    TestPassingProcess, TestPassingResults,
    TestPassingShortInfo,
    TestPassingType,
} from '@/domain/services/test-passing/test-passing.types';
import {
    MongoTestPassingShortConverter,
} from '@/domain/converters/mongo/mongo-test-passing-short.converter';
import {
    getTestPassingResult,
} from '@/domain/converters/test-passing-result/implementations/getTestPassingResult';
import {
    MongoTestPassingConverter,
} from '@/domain/converters/mongo/mongo-test-passing.converter';
import {
    MongoTestPassingProcessConverter,
} from '@/domain/converters/mongo/mongo-test-passing-process.converter';
import {
    TestPassingQuestionDocument,
} from '@/db/mongoose/test-passing-question/test-passing-question.model';
import {
    MongoTestPassingQuestionConverter,
} from '@/domain/converters/mongo/mongo-test-passing-question.converter';
import {
    MongoTestPassingQuestionAnswerConverter,
} from '@/domain/converters/mongo/mongo-test-passing-question-answer.converter';
import {
    MongoTestPassingResultQuestionAnswerConverter,
    TestPassingResultQuestionAnswerProps,
} from '@/domain/converters/mongo/mongo-test-passing-result-question-answer.converter';
import {
    MongoTestPassingResultQuestionConverter,
} from '@/domain/converters/mongo/mongo-test-passing-result-question.converter';
import {
    MongoTestPassingResultConverter,
} from '@/domain/converters/mongo/mongo-test-passing-result.converter';
import {
    IMongoFilterConverter,
    IMongoQuestionAnswerConverter,
    IMongoQuestionAnswerPassingConverter,
    IMongoQuestionConverter,
    IMongoQuestionPassingConverter,
    IMongoRoleConverter,
    IMongoTestConverter,
    IMongoTestPassingConverter,
    IMongoTestPassingProcessConverter,
    IMongoTestPassingShortConverter,
    IMongoTestResultConverter,
    IMongoTestResultQuestionAnswerConverter,
    IMongoTestResultQuestionConverter,
    IMongoThemeConverter,
    IMongoThemesChildrenConverter,
    IMongoThemeShortConverter,
    IMongoUserConverter,
} from '@/domain/converters/mongo/mongo-converters.types';


@Injectable()
export class MongoConverterService {
    public readonly filter: IMongoFilterConverter;
    public readonly theme: IMongoThemeConverter;
    public readonly user: IMongoUserConverter;
    public readonly role: IMongoRoleConverter;
    public readonly themeShort: IMongoThemeShortConverter;
    public readonly test: IMongoTestConverter;
    public readonly questionAnswerPassing: IMongoQuestionAnswerPassingConverter;
    public readonly question: IMongoQuestionConverter;
    public readonly questionAnswer: IMongoQuestionAnswerConverter;
    public readonly questionPassing: IMongoQuestionPassingConverter;
    public readonly themesChildren: IMongoThemesChildrenConverter;
    public readonly testPassingShort: IMongoTestPassingShortConverter;
    public readonly testPassing: IMongoTestPassingConverter;
    public readonly testPassingProcess: IMongoTestPassingProcessConverter;
    public readonly testResult: IMongoTestResultConverter;
    public readonly testResultQuestion: IMongoTestResultQuestionConverter;
    public readonly testResultQuestionAnswer: IMongoTestResultQuestionAnswerConverter;

    constructor () {
        this.filter                   = new MongoFilterConverter();
        this.theme                    = new MongoThemeConverter();
        this.themeShort               = new MongoThemeShortConverter();
        this.test                     = new MongoTestConverter();
        this.questionAnswerPassing    = new MongoTestPassingQuestionAnswerConverter();
        this.questionAnswer           = new MongoQuestionAnswerConverter();
        this.question                 = new MongoQuestionConverter(this.questionAnswer);
        this.questionPassing          = new MongoTestPassingQuestionConverter(this.questionAnswerPassing);
        this.themesChildren           = new MongoThemesChildrenConverter(this.themeShort);
        this.role                     = new MongoRoleConverter();
        this.user                     = new MongoUserTypeConverter(this.role);
        this.testPassingShort         = new MongoTestPassingShortConverter(getTestPassingResult);
        this.testPassing              = new MongoTestPassingConverter();
        this.testPassingProcess       = new MongoTestPassingProcessConverter(this.questionPassing);
        this.testResultQuestionAnswer = new MongoTestPassingResultQuestionAnswerConverter();
        this.testResultQuestion       = new MongoTestPassingResultQuestionConverter(this.testResultQuestionAnswer, this.themeShort);
        this.testResult               = new MongoTestPassingResultConverter(getTestPassingResult, this.testResultQuestion);
    }
}