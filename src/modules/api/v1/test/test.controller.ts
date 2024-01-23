import { Body, Controller, Post } from '@nestjs/common';
import { CreateTestDto } from '@/modules/api/v1/test/dto/create-test.dto';


@Controller('/api/v1/test')
export class TestController {
    @Post()
    create (@Body() createDto: CreateTestDto) {

    }
}