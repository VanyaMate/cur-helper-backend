import { Body, Controller, Get, Post } from '@nestjs/common';
import { ThemeService } from './theme.service';
import { CreateThemeDto } from './dto/create-theme.dto';


@Controller('/api/v1/theme')
export class ThemeController {
    constructor (
        private readonly _themeService: ThemeService,
    ) {
    }

    @Get('')
    getAll () {
        return this._themeService.getAll();
    }

    @Post('')
    create (@Body() createDto: CreateThemeDto) {
        return this._themeService.create(createDto);
    }
}