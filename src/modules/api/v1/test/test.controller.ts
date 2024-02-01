import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TestService } from '@/modules/api/v1/test/test.service';
import { TestCreateType, TestUpdateType } from '@/domain/services/test/test.types';

// test railway auto deploy
@Controller('/api/v1/test')
export class TestController {
    constructor (private readonly _testService: TestService) {
    }

    @Post()
    create (@Body() createData: TestCreateType) {
        return this._testService.create(createData);
    }

    @Get('/:id')
    getById (
        @Param('id') id: string,
    ) {
        return this._testService.getById(id);
    }

    @Patch('/:id')
    updateById (
        @Param('id') id: string,
        @Body() updateData: TestUpdateType,
    ) {
        return this._testService.updateById(id, updateData);
    }

    @Delete('/:id')
    deleteById (
        @Param('id') id: string,
    ) {
        return this._testService.deleteById(id);
    }
}