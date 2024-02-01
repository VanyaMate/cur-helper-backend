import { Controller, Get, Param } from '@nestjs/common';
import { ThemesService } from '@/modules/api/v1/themes/themes.service';


@Controller('/api/v1/themes')
export class ThemesController {
    constructor (private readonly _themesService: ThemesService) {

    }


    @Get('/full/:id')
    getFullByPublicId (
        @Param('id') id: string,
    ) {
        return this._themesService.getFullDataByPublicId(id);
    }
}