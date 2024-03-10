import { Controller, Get, Param } from '@nestjs/common';
import { AdminThemesService } from '@/modules/api/v1/admin/themes/admin-themes.service';


@Controller('/api/v1/admin/themes')
export class AdminThemesController {
    constructor (
        private readonly _adminThemesService: AdminThemesService,
    ) {
    }

    // TODO: Add guards
    @Get()
    getList () {
        return this._adminThemesService.getList({}, { sort: [ 'publicId', 'asc' ] });
    }

    // TODO: Add guards
    @Get(':id')
    getOneById (
        @Param('id') id: string,
    ) {
        return this._adminThemesService.getOneById(id);
    }
}