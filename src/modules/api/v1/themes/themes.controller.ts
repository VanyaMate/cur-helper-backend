import { Controller, Get, Param } from '@nestjs/common';
import { ThemesService } from '@/modules/api/v1/themes/themes.service';


@Controller('/api/v1/themes')
export class ThemesController {
    constructor (private readonly _themesService: ThemesService) {

    }


    @Get('list')
    async getList () {
        return this._themesService.getList();
    }

    @Get('list/:id')
    async getListById (@Param('id') id: string) {
        return await this._themesService.getListById(id);
    }

    @Get(':id')
    async getFullByPublicId (
        @Param('id') id: string,
    ) {
        return this._themesService.getFullDataByPublicId(id);
    }
}