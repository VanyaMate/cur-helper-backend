import { Controller, Get, Param } from '@nestjs/common';
import { AdminTestsService } from '@/modules/api/v1/admin/tests/admin-tests.service';


@Controller('/api/v1/admin/tests')
export class AdminTestsController {
    constructor (
        private readonly _adminTestsService: AdminTestsService,
    ) {
    }

    // TODO: Add guard
    @Get(':id')
    getOneById (
        @Param('id') id: string,
    ) {
        return this._adminTestsService.getOneById(id);
    }

    // TODO: Add guard
    @Get()
    getMany () {
        return this._adminTestsService.getMany();
    }
}