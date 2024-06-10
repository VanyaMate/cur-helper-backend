import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { QuestionService } from '@/modules/api/v1/question/question.service';
import { QuestionCreateType, QuestionUpdateType } from '@vanyamate/cur-helper-types';
import {
    HeaderVerifiedUserGuard
} from '@/modules/guards/header/header-verified-user.guard';


@Controller('/api/v1/question')
export class QuestionController {
    constructor (private readonly _questionService: QuestionService) {
    }

    @Post()
    @UseGuards(HeaderVerifiedUserGuard)
    create (@Body() createData: QuestionCreateType) {
        return this._questionService.create(createData);
    }

    @Get('/:id')
    getById (@Param('id') id: string) {
        return this._questionService.getById(id);
    }

    @Patch('/:id')
    @UseGuards(HeaderVerifiedUserGuard)
    updateById (
        @Param('id') id: string,
        @Body() updateData: QuestionUpdateType,
    ) {
        return this._questionService.updateById(id, updateData);
    }

    @Delete('/:id')
    @UseGuards(HeaderVerifiedUserGuard)
    deleteById (@Param('id') id: string) {
        return this._questionService.deleteById(id);
    }
}