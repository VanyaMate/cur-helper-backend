import {
    AdminQuestionShortType, AdminTestShortType,
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
    RoleType, TestPassingProcess, TestPassingResults,
    TestPassingShortInfo,
    TestPassingType,
    TestShortType,
    TestType,
    ThemeRecursiveChildren,
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
} from '@/domain/converters/mongo/mongo-themes-children.converter';
import { TestPassingDocument } from '@/db/mongoose/test-passing/test-passing.model';
import {
    TestPassingResultQuestionAnswerProps,
} from '@/domain/converters/mongo/mongo-test-passing-result-question-answer.converter';


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
export type IMongoThemesChildrenConverter = IConverter<ThemeChildrenConverterType, With<ThemeShortType, [ ThemeRecursiveChildren ]>[]>;
export type IMongoTestPassingShortConverter = IConverter<TestPassingDocument, TestPassingShortInfo>;
export type IMongoTestPassingConverter = IConverter<TestPassingDocument, TestPassingType>;
export type IMongoTestPassingProcessConverter = IConverter<TestPassingDocument, TestPassingProcess>;
export type IMongoTestResultConverter = IConverter<TestPassingDocument, TestPassingResults>;
export type IMongoTestResultQuestionConverter = IConverter<TestPassingQuestionDocument, With<QuestionType, [ QuestionSelect, QuestionResult, QuestionThemes, QuestionAnswers ]>>;
export type IMongoTestResultQuestionAnswerConverter = IConverter<TestPassingResultQuestionAnswerProps, QuestionAnswerType>;
export type IMongoAdminThemeShortConverter = IConverter<ThemeDocument, AdminThemeShortType>;
export type IMongoAdminTestShortConverter = IConverter<TestDocument, AdminTestShortType>;
export type IMongoAdminQuestionShortConverter = IConverter<QuestionDocument, AdminQuestionShortType>;