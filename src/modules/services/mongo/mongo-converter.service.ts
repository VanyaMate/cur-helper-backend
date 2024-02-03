import { Injectable } from '@nestjs/common';
import { Filter, IConverter } from '@/domain/service.types';
import { FilterQuery } from 'mongoose';
import {
    MongoFilterConverter,
} from '@/domain/implementations/mongo/mongo-filter.converter';
import { MongoThemeConverter } from '@/domain/converters/mongo/mongo-theme.converter';
import { ThemeDocument } from '@/db/mongoose/theme/theme.model';
import { ThemeType } from '@/domain/services/theme/theme.types';
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
import { QuestionType } from '@/domain/services/question/question.types';
import {
    MongoThemesChildrenConverter, ThemeChildrenConverterType,
} from '@/domain/converters/mongo/mongo-themes-children.converter';
import { ThemeChildren, ThemeWith } from '@/domain/services/themes/themes.types';


@Injectable()
export class MongoConverterService {
    public readonly filter: IConverter<Filter<any>, FilterQuery<any>>;
    public readonly theme: IConverter<ThemeDocument, ThemeType>;
    public readonly test: IConverter<TestDocument, TestType>;
    public readonly question: IConverter<QuestionDocument, QuestionType>;
    public readonly questionAnswer: IConverter<QuestionAnswerDocument, QuestionAnswerType>;
    public readonly themesChildren: IConverter<ThemeChildrenConverterType, ThemeWith<[ ThemeChildren ]>[]>;

    constructor () {
        this.filter         = new MongoFilterConverter();
        this.theme          = new MongoThemeConverter();
        this.test           = new MongoTestConverter();
        this.questionAnswer = new MongoQuestionAnswerConverter();
        this.question       = new MongoQuestionConverter(this.questionAnswer);
        this.themesChildren = new MongoThemesChildrenConverter(this.theme);
    }
}