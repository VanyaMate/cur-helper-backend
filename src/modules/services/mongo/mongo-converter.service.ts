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
    MongoThemeRecursiveChildrenConverter,
} from '@/domain/converters/mongo/mongo-theme-recursive-children.converter';
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
    IMongoQuestionPassingConverter,
    IMongoQuestionShortConverter,
    IMongoRoleConverter,
    IMongoTestConverter,
    IMongoTestPassingConverter,
    IMongoTestPassingProcessConverter,
    IMongoTestPassingShortConverter,
    IMongoTestResultConverter,
    IMongoTestResultQuestionAnswerConverter,
    IMongoTestResultQuestionConverter,
    IMongoTestShortConverter,
    IMongoThemeConverter,
    IMongoThemeRecursiveChildrenConverter,
    IMongoThemeShortConverter,
    IMongoUserConverter,
    IMongoThemeRecursiveConverter,
    IMongoThemeFullConverter,
    IMongoThemeChildrenConverter,
    IMongoTestWithLatestResultsConverter,
    IMongoTestListConverter, IMongoTestFullDataConverter,
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
import {
    MongoThemeChildrenConverter,
} from '@/domain/converters/mongo/composite/theme/mongo-theme-children.converter';
import {
    MongoThemeRecursiveConverter,
} from '@/domain/converters/mongo/composite/theme/mongo-theme-recursive.converter';
import {
    MongoThemeFullTypeConverter,
} from '@/domain/converters/mongo/composite/theme/mongo-theme-full-type.converter';
import {
    MongoTestWithLatestResultConverter,
} from '@/domain/converters/mongo/test/mongo-test-with-latest-result.converter';
import {
    MongoTestListConverter,
} from '@/domain/converters/mongo/composite/test/mongo-test-list.converter';
import {
    MongoTestFullDataConvertert,
} from '@/domain/converters/mongo/composite/test/mongo-test-full-data.convertert';


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
    public readonly themeRecursiveChildren: IMongoThemeRecursiveChildrenConverter;
    public readonly themeChildren: IMongoThemeChildrenConverter;
    public readonly themeRecursive: IMongoThemeRecursiveConverter;
    public readonly themeFull: IMongoThemeFullConverter;
    public readonly testPassingShort: IMongoTestPassingShortConverter;
    public readonly testPassing: IMongoTestPassingConverter;
    public readonly testPassingProcess: IMongoTestPassingProcessConverter;
    public readonly testResult: IMongoTestResultConverter;
    public readonly testResultQuestion: IMongoTestResultQuestionConverter;
    public readonly testResultQuestionAnswer: IMongoTestResultQuestionAnswerConverter;
    public readonly adminThemeShort: IMongoAdminThemeShortConverter;
    public readonly adminTestShort: IMongoAdminTestShortConverter;
    public readonly adminQuestionShort: IMongoAdminQuestionShortConverter;
    public readonly testWithLatestResults: IMongoTestWithLatestResultsConverter;
    public readonly testList: IMongoTestListConverter;
    public readonly testFullData: IMongoTestFullDataConverter;

    constructor () {
        this.filter = new MongoFilterConverter();

        this.theme                    = new MongoThemeConverter();
        this.themeShort               = new MongoThemeShortConverter();
        this.test                     = new MongoTestConverter();
        this.testShort                = new MongoTestShortConverter();
        this.questionAnswer           = new MongoQuestionAnswerConverter();
        this.questionAnswerPassing    = new MongoTestPassingQuestionAnswerConverter();
        this.question                 = new MongoQuestionConverter();
        this.questionShort            = new MongoQuestionShortConverter();
        this.testResultQuestionAnswer = new MongoTestPassingResultQuestionAnswerConverter();
        this.adminThemeShort          = new MongoAdminThemeShortConverter();
        this.adminTestShort           = new MongoAdminTestShortConverter();
        this.role                     = new MongoRoleConverter();
        this.adminQuestionShort       = new MongoAdminQuestionShortConverter();
        this.testPassing              = new MongoTestPassingConverter();

        this.themeRecursiveChildren = new MongoThemeRecursiveChildrenConverter(this.themeShort);
        this.themeChildren          = new MongoThemeChildrenConverter(this.themeShort, this.themeRecursiveChildren);
        this.themeRecursive         = new MongoThemeRecursiveConverter(this.themeShort, this.themeRecursiveChildren);
        this.testPassingShort       = new MongoTestPassingShortConverter(getTestPassingResult);
        this.themeFull              = new MongoThemeFullTypeConverter(this.test, this.theme, this.themeShort, this.testPassingShort);
        this.testFullData           = new MongoTestFullDataConvertert(this.test, this.themeShort, this.testPassingShort);
        this.testList               = new MongoTestListConverter(this.themeShort, this.test, this.testPassingShort);
        this.questionPassing        = new MongoTestPassingQuestionConverter(this.questionAnswerPassing);
        this.testPassingProcess     = new MongoTestPassingProcessConverter(this.questionPassing);
        this.testResultQuestion     = new MongoTestPassingResultQuestionConverter(this.testResultQuestionAnswer, this.themeShort);
        this.testResult             = new MongoTestPassingResultConverter(this.testResultQuestion);
        this.testWithLatestResults  = new MongoTestWithLatestResultConverter(this.test, this.testPassingShort);
        this.user                   = new MongoUserTypeConverter(this.role);
    }
}