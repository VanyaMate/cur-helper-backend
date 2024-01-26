import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTestDto } from '@/modules/api/v1/test/dto/create-test.dto';
import { TestService } from '@/modules/api/v1/test/test.service';


@Controller('/api/v1/test')
export class TestController {
    constructor (private readonly _testsService: TestService) {
    }

    @Post()
    create (@Body() createDto: CreateTestDto) {

    }

    @Get()
    getAll () {
        return this._testsService.getAll();
    }
}