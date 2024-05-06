import {
    AdminQuestionShortType,
    AdminTestShortType,
    AdminThemeShortType,
    Filter,
    IConverter,
    QuestionAnswers,
    QuestionAnswerType,
    QuestionResult,
    QuestionSelect,
    QuestionShortType,
    QuestionThemes,
    QuestionType,
    RoleType,
    TestFullType,
    TestListType,
    TestPassingProcess,
    TestPassingResults,
    TestPassingShortInfo,
    TestPassingType,
    TestShortResult,
    TestShortType,
    TestType,
    ThemeChildrenType,
    ThemeFullType,
    ThemeRecursiveChildren,
    ThemeRecursiveType,
    ThemeShortType,
    ThemeType,
    UserType,
    With,
} from '@vanyamate/cur-helper-types';
import { FilterQuery } from 'mongoose';
import { ThemeDocument } from '@/db/mongoose/theme/theme.model';
import { UserDocument } from '@/db/mongoose/user/user.model';
import { RoleDocument } from '@/db/mongoose/role/role.model';
import { TestDocument } from '@/db/mongoose/test/test.model';
import {
    QuestionAnswerDocument,
} from '@/db/mongoose/question-answer/question-answer.model';
import { QuestionDocument } from '@/db/mongoose/question/question.model';
import {
    TestPassingQuestionDocument,
} from '@/db/mongoose/test-passing-question/test-passing-question.model';
import {
    ThemeChildrenConverterType,
} from '@/domain/converters/mongo/mongo-theme-recursive-children.converter';
import {
    TestPassingDocument,
} from '@/db/mongoose/test-passing/test-passing.model';
import {
    TestPassingResultQuestionAnswerProps,
} from '@/domain/converters/mongo/mongo-test-passing-result-question-answer.converter';
import {
    ThemeListConverterDocumentsType,
} from '@/domain/converters/mongo/composite/theme/mongo-theme-recursive.converter';
import {
    ThemeFullTypeConverterDocumentsType,
} from '@/domain/converters/mongo/composite/theme/mongo-theme-full-type.converter';
import {
    ThemeListByIdConverterDocumentsType,
} from '@/domain/converters/mongo/composite/theme/mongo-theme-children.converter';
import {
    LatestTestResultType,
} from '@/domain/services/themes/implementations/mongo/mongo-public-themes-service';
import {
    TestResultShortType,
} from '@vanyamate/cur-helper-types/types/test-passing';


export type MongoTestWithLatestResultsDataType = {
    tests: TestDocument[];
    latestResults: LatestTestResultType[];
}

export type MongoTestListDataType = {
    themes: ThemeDocument[],
    latestTestResults: LatestTestResultType[];
}

export type MongoTestFullDataType = {
    test: TestDocument,
    testPassing: TestPassingDocument | null,
    themes: Map<string, ThemeDocument>,
}

export type IMongoFilterConverter = IConverter<Filter<any>, FilterQuery<any>>;
export type IMongoThemeConverter = IConverter<ThemeDocument, ThemeType>;
export type IMongoUserConverter = IConverter<UserDocument, UserType>;
export type IMongoRoleConverter = IConverter<RoleDocument, RoleType>;
export type IMongoThemeShortConverter = IConverter<ThemeDocument, ThemeShortType>;
export type IMongoTestConverter = IConverter<TestDocument, TestType>;
export type IMongoTestShortConverter = IConverter<TestDocument, TestShortType>;
export type IMongoQuestionAnswerPassingConverter = IConverter<QuestionAnswerDocument, QuestionAnswerType>;
export type IMongoQuestionConverter = IConverter<QuestionDocument, QuestionType>;
export type IMongoQuestionShortConverter = IConverter<QuestionDocument, QuestionShortType>;
export type IMongoQuestionAnswerConverter = IConverter<QuestionAnswerDocument, QuestionAnswerType>;
export type IMongoQuestionPassingConverter = IConverter<TestPassingQuestionDocument, With<QuestionType, [ QuestionSelect, QuestionAnswers ]>>;
export type IMongoThemeRecursiveChildrenConverter = IConverter<ThemeChildrenConverterType, ThemeRecursiveChildren>;
export type IMongoThemeChildrenConverter = IConverter<ThemeListByIdConverterDocumentsType, ThemeChildrenType>;
export type IMongoThemeRecursiveConverter = IConverter<ThemeListConverterDocumentsType, ThemeRecursiveType[]>;
export type IMongoThemeFullConverter = IConverter<ThemeFullTypeConverterDocumentsType, ThemeFullType>;
export type IMongoTestPassingShortConverter = IConverter<TestPassingDocument, TestPassingShortInfo>;
export type IMongoTestPassingConverter = IConverter<TestPassingDocument, TestPassingType>;
export type IMongoTestPassingProcessConverter = IConverter<TestPassingDocument, TestPassingProcess>;
export type IMongoTestResultConverter = IConverter<TestPassingDocument, TestPassingResults>;
export type IMongoTestResultShortConverter = IConverter<TestPassingDocument, TestResultShortType>;
export type IMongoTestResultQuestionConverter = IConverter<TestPassingQuestionDocument, With<QuestionType, [ QuestionSelect, QuestionResult, QuestionThemes, QuestionAnswers ]>>;
export type IMongoTestResultQuestionAnswerConverter = IConverter<TestPassingResultQuestionAnswerProps, QuestionAnswerType>;
export type IMongoAdminThemeShortConverter = IConverter<ThemeDocument, AdminThemeShortType>;
export type IMongoAdminTestShortConverter = IConverter<TestDocument, AdminTestShortType>;
export type IMongoAdminQuestionShortConverter = IConverter<QuestionDocument, AdminQuestionShortType>;
export type IMongoTestWithLatestResultsConverter = IConverter<MongoTestWithLatestResultsDataType, With<TestType, [ TestShortResult ]>[]>
export type IMongoTestListConverter = IConverter<MongoTestListDataType, TestListType[]>;
export type IMongoTestFullDataConverter = IConverter<MongoTestFullDataType, TestFullType>;