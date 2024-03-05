import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ThemeModel } from '@/db/mongoose/theme/theme.model';
import {
    MongoPublicThemesService,
} from '@/domain/services/themes/implementations/mongo/mongo-public-themes-service';
import { MongoConverterService } from '@/modules/services/mongo/mongo-converter.service';
import { TestPassingModel } from '@/db/mongoose/test-passing/test-passing.model';
import { ErrorCallerService } from '@/modules/services/error/error-caller.service';


@Injectable()
export class ThemesService extends MongoPublicThemesService {
    constructor (
        @InjectModel('ThemeModel') readonly mongoThemeRepository: Model<ThemeModel>,
        @InjectModel('TestPassingModel') readonly testPassingModel: Model<TestPassingModel>,
        readonly mongoConverter: MongoConverterService,
        readonly errorCaller: ErrorCallerService,
    ) {
        super(
            errorCaller,
            mongoThemeRepository,
            testPassingModel,
            mongoConverter.themeFull,
            mongoConverter.themeChildren,
            mongoConverter.themeRecursive,
        );
    }
}