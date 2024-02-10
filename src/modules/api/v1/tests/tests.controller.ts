import { Controller, Get, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { TestsService } from '@/modules/api/v1/tests/tests.service';


@Controller('/api/v1/tests')
export class TestsController {
    constructor (private readonly _testsService: TestsService) {
    }

    @Get(':themeId/:testId')
    getById (
        @Param() ids: { themeId: string, testId: string },
        @Req() request: Request,
    ) {
        return this._testsService.getById(ids.themeId, ids.testId, request['user-jwt-data']?.userId);
    }

    @Get(':themeId')
    getByThemeId (
        @Param('themeId') themeId: string,
        @Req() request: Request,
    ) {
        return this._testsService.getListById(themeId, request['user-jwt-data']?.userId);
    }


    @Get()
    getList (
        @Req() request: Request,
    ) {
        return this._testsService.getListById('', request['user-jwt-data']?.userId);
    }
}