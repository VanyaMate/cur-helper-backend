import { Injectable } from '@nestjs/common';
import {
    MongoFilterConverter,
} from '@/domain/converters/mongo/mongo-filter.converter';
import { MongoThemeConverter } from '@/domain/converters/mongo/mongo-theme.converter';
import { MongoTestConverter } from '@/domain/converters/mongo/mongo-test.converter';
import {
    MongoQuestionAnswerConverter,
} from '@/domain/converters/mongo/mongo-question-answer.converter';
import {
    MongoQuestionConverter,
} from '@/domain/converters/mongo/mongo-question.converter';
import {
    MongoThemesChildrenConverter,
} from '@/domain/converters/mongo/mongo-themes-children.converter';
import {
    MongoThemeShortConverter,
} from '@/domain/converters/mongo/mongo-theme-short.converter';
import {
    MongoUserTypeConverter,
} from '@/domain/converters/mongo/mongo-user-type.converter';
import {
    MongoRoleConverter,
} from '@/domain/services/role/implementations/mongo/mongo-role.converter';
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
    MongoTestPassingQuestionConverter,
} from '@/domain/converters/mongo/mongo-test-passing-question.converter';
import {
    MongoTestPassingQuestionAnswerConverter,
} from '@/domain/converters/mongo/mongo-test-passing-question-answer.converter';
import {
    MongoTestPassingResultQuestionAnswerConverter,
} from '@/domain/converters/mongo/mongo-test-passing-result-question-answer.converter';
import {
    MongoTestPassingResultQuestionConverter,
} from '@/domain/converters/mongo/mongo-test-passing-result-question.converter';
import {
    MongoTestPassingResultConverter,
} from '@/domain/converters/mongo/mongo-test-passing-result.converter';
import {
    IMongoAdminQuestionShortConverter,
    IMongoAdminTestShortConverter,
    IMongoAdminThemeShortConverter,
    IMongoFilterConverter,
    IMongoQuestionAnswerConverter,
    IMongoQuestionAnswerPassingConverter,
    IMongoQuestionConverter,
    IMongoQuestionPassingConverter, IMongoQuestionShortConverter,
    IMongoRoleConverter,
    IMongoTestConverter,
    IMongoTestPassingConverter,
    IMongoTestPassingProcessConverter,
    IMongoTestPassingShortConverter,
    IMongoTestResultConverter,
    IMongoTestResultQuestionAnswerConverter,
    IMongoTestResultQuestionConverter, IMongoTestShortConverter,
    IMongoThemeConverter,
    IMongoThemesChildrenConverter,
    IMongoThemeShortConverter,
    IMongoUserConverter,
} from '@/domain/converters/mongo/mongo-converters.types';
import {
    MongoAdminThemeShortConverter,
} from '@/domain/converters/mongo/mongo-admin-theme-short.converter';
import {
    MongoTestShortConverter,
} from '@/domain/converters/mongo/mongo-test-short.converter';
import {
    MongoQuestionShortConverter,
} from '@/domain/converters/mongo/mongo-question-short.converter';
import {
    MongoAdminTestShortConverter,
} from '@/domain/converters/mongo/mongo-admin-test-short.converter';
import {
    MongoAdminQuestionShortConverter,
} from '@/domain/converters/mongo/mongo-admin-question-short.converter';


@Injectable()
export class MongoConverterService {
    public readonly filter: IMongoFilterConverter;
    public readonly theme: IMongoThemeConverter;
    public readonly user: IMongoUserConverter;
    public readonly role: IMongoRoleConverter;
    public readonly themeShort: IMongoThemeShortConverter;
    public readonly test: IMongoTestConverter;
    public readonly testShort: IMongoTestShortConverter;
    public readonly questionAnswerPassing: IMongoQuestionAnswerPassingConverter;
    public readonly question: IMongoQuestionConverter;
    public readonly questionShort: IMongoQuestionShortConverter;
    public readonly questionAnswer: IMongoQuestionAnswerConverter;
    public readonly questionPassing: IMongoQuestionPassingConverter;
    public readonly themesChildren: IMongoThemesChildrenConverter;
    public readonly testPassingShort: IMongoTestPassingShortConverter;
    public readonly testPassing: IMongoTestPassingConverter;
    public readonly testPassingProcess: IMongoTestPassingProcessConverter;
    public readonly testResult: IMongoTestResultConverter;
    public readonly testResultQuestion: IMongoTestResultQuestionConverter;
    public readonly testResultQuestionAnswer: IMongoTestResultQuestionAnswerConverter;
    public readonly adminThemeShort: IMongoAdminThemeShortConverter;
    public readonly adminTestShort: IMongoAdminTestShortConverter;
    public readonly adminQuestionShort: IMongoAdminQuestionShortConverter;

    constructor () {
        this.filter                   = new MongoFilterConverter();
        this.theme                    = new MongoThemeConverter();
        this.themeShort               = new MongoThemeShortConverter();
        this.test                     = new MongoTestConverter();
        this.testShort                = new MongoTestShortConverter();
        this.questionAnswerPassing    = new MongoTestPassingQuestionAnswerConverter();
        this.questionAnswer           = new MongoQuestionAnswerConverter();
        this.question                 = new MongoQuestionConverter(this.questionAnswer);
        this.questionShort            = new MongoQuestionShortConverter();
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
        this.adminThemeShort          = new MongoAdminThemeShortConverter();
        this.adminTestShort           = new MongoAdminTestShortConverter();
        this.adminQuestionShort       = new MongoAdminQuestionShortConverter();
    }
}