import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { QuestionService } from '@/modules/api/v1/question/question.service';
import { QuestionCreateType, QuestionUpdateType } from '@/domain/question/question.types';


@Controller('/api/v1/question')
export class QuestionController {
    constructor (private readonly _questionService: QuestionService) {
    }

    @Post()
    create (@Body() createData: QuestionCreateType) {
        return this._questionService.create(createData);
    }

    @Get('/:id')
    getById (@Param('id') id: string) {
        return this._questionService.getById(id);
    }

    @Patch('/:id')
    updateById (
        @Param('id') id: string,
        @Body() updateData: QuestionUpdateType,
    ) {
        return this._questionService.updateById(id, updateData);
    }

    @Delete('/:id')
    deleteById (@Param('id') id: string) {
        return this._questionService.deleteById(id);
    }
}