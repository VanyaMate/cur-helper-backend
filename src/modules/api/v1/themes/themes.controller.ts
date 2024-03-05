import { Controller, Get, HttpException, HttpStatus, Param, Req } from '@nestjs/common';
import { ThemesService } from '@/modules/api/v1/themes/themes.service';
import { Request } from 'express';


@Controller('/api/v1/themes')
export class ThemesController {
    constructor (private readonly _themesService: ThemesService) {

    }

    @Get('list')
    async getList () {
        return this._themesService.getThemesList();
    }

    @Get('list/:id')
    async getListById (@Param('id') id: string) {
        return this._themesService.getThemeListById(id);
    }

    @Get(':id')
    async getFullByPublicId (
        @Param('id') id: string,
        @Req() request: Request,
    ) {
        return this._themesService.getThemeFullDataByPublicId(id, request['user-jwt-data']?.userId);
    }
}