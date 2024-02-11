import { Filter, IConverter } from '@/domain/service.types';
import { FilterQuery } from 'mongoose';
import { ThemeDocument } from '@/db/mongoose/theme/theme.model';
import { ThemeShortType, ThemeType } from '@/domain/services/theme/theme.types';
import { UserDocument } from '@/db/mongoose/user/user.model';
import { UserType } from '@/domain/services/user/user.types';
import { RoleDocument } from '@/db/mongoose/role/role.model';
import { RoleType } from '@/domain/services/role/role.types';
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
    TestPassingQuestionDocument,
} from '@/db/mongoose/test-passing-question/test-passing-question.model';
import { With } from '@/domain/types';
import {
    ThemeChildrenConverterType,
} from '@/domain/converters/mongo/mongo-themes-children.converter';
import { ThemeRecursiveChildren } from '@/domain/services/themes/themes.types';
import { TestPassingDocument } from '@/db/mongoose/test-passing/test-passing.model';
import {
    TestPassingProcess, TestPassingResults,
    TestPassingShortInfo,
    TestPassingType,
} from '@/domain/services/test-passing/test-passing.types';
import {
    TestPassingResultQuestionAnswerProps,
} from '@/domain/converters/mongo/mongo-test-passing-result-question-answer.converter';


export type IMongoFilterConverter = IConverter<Filter<any>, FilterQuery<any>>;
export type IMongoThemeConverter = IConverter<ThemeDocument, ThemeType>;
export type IMongoUserConverter = IConverter<UserDocument, UserType>;
export type IMongoRoleConverter = IConverter<RoleDocument, RoleType>;
export type IMongoThemeShortConverter = IConverter<ThemeDocument, ThemeShortType>;
export type IMongoTestConverter = IConverter<TestDocument, TestType>;
export type IMongoQuestionAnswerPassingConverter = IConverter<QuestionAnswerDocument, QuestionAnswerType>;
export type IMongoQuestionConverter = IConverter<QuestionDocument, QuestionType>;
export type IMongoQuestionAnswerConverter = IConverter<QuestionAnswerDocument, QuestionAnswerType>;
export type IMongoQuestionPassingConverter = IConverter<TestPassingQuestionDocument, With<QuestionType, [ QuestionSelect ]>>;
export type IMongoThemesChildrenConverter = IConverter<ThemeChildrenConverterType, With<ThemeShortType, [ ThemeRecursiveChildren ]>[]>;
export type IMongoTestPassingShortConverter = IConverter<TestPassingDocument, TestPassingShortInfo>;
export type IMongoTestPassingConverter = IConverter<TestPassingDocument, TestPassingType>;
export type IMongoTestPassingProcessConverter = IConverter<TestPassingDocument, TestPassingProcess>;
export type IMongoTestResultConverter = IConverter<TestPassingDocument, TestPassingResults>;
export type IMongoTestResultQuestionConverter = IConverter<TestPassingQuestionDocument, With<QuestionType, [ QuestionSelect, QuestionResult, QuestionThemes ]>>;
export type IMongoTestResultQuestionAnswerConverter = IConverter<TestPassingResultQuestionAnswerProps, QuestionAnswerType>;