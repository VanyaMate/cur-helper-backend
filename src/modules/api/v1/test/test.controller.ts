import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TestService } from '@/modules/api/v1/test/test.service';
import * as querystring from 'querystring';


@Controller('/api/v1/test')
export class TestController {
    constructor (private readonly _testsService: TestService) {
    }

    @Post('/themes')
    createTheme (@Body() createDto: { id: string, title: string }) {
        return this._testsService.createTheme(createDto.id, createDto.title);
    }

    @Post('/tests')
    createTest (@Body() createDto: { id: string, title: string }) {
        return this._testsService.createTest(createDto.id, createDto.title);
    }

    @Post('/questions')
    createQuestion (@Body() createDto: {
        id: string,
        title: string,
        answers: { title: string, correct: boolean }[]
    }) {
        return this._testsService.createQuestion(createDto.id, createDto.title, createDto.answers);
    }

    @Patch('/questions')
    updateQuestions (@Body() updateDto: {
        questionId: string,
        answer: { title: string, correct: boolean }
    }) {
        return this._testsService.addAnswer(updateDto.questionId, updateDto.answer);
    }

    @Patch('/tests')
    updateTests (@Body() updateDto: {
        testsId: string,
        questionsId: string
    }) {
        return this._testsService.addQuestion(updateDto.testsId, updateDto.questionsId);
    }

    @Get('/themes/:id')
    getThemes (@Param('id') id: string) {
        return this._testsService.getThemes(id);
    }

    @Get('/tests/:id')
    getTests (@Param('id') id: string) {
        return this._testsService.getTests(id);
    }

    @Get('/questions/:id')
    getQuestions (@Param('id') id: string) {
        return this._testsService.getQuestions(id);
    }
}