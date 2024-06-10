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
import { TestService } from '@/modules/api/v1/test/test.service';
import { TestCreateType, TestUpdateType } from '@vanyamate/cur-helper-types';
import {
    HeaderVerifiedUserGuard
} from '@/modules/guards/header/header-verified-user.guard';


@Controller('/api/v1/test')
export class TestController {
    constructor (private readonly _testService: TestService) {
    }

    @Post()
    @UseGuards(HeaderVerifiedUserGuard)
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
    @UseGuards(HeaderVerifiedUserGuard)
    updateById (
        @Param('id') id: string,
        @Body() updateData: TestUpdateType,
    ) {
        return this._testService.updateById(id, updateData);
    }

    @Delete('/:id')
    @UseGuards(HeaderVerifiedUserGuard)
    deleteById (
        @Param('id') id: string,
    ) {
        return this._testService.deleteById(id);
    }
}