import {
    Body,
    Controller, Delete,
    Get,
    Param,
    Patch,
    Post, UseGuards,
} from '@nestjs/common';
import { ThemeService } from '@/modules/api/v1/theme/theme.service';
import { ThemeCreateType, ThemeUpdateType } from '@vanyamate/cur-helper-types';
import {
    HeaderVerifiedUserGuard
} from '@/modules/guards/header/header-verified-user.guard';


@Controller('/api/v1/theme')
export class ThemeController {
    constructor (private readonly _themeService: ThemeService) {
    }

    @Post()
    @UseGuards(HeaderVerifiedUserGuard)
    createTheme (@Body() createData: ThemeCreateType) {
        return this._themeService.createTheme(createData);
    }

    @Get('/:id')
    getById (@Param('id') id: string) {
        return this._themeService.getById(id);
    }

    @Patch('/:id')
    @UseGuards(HeaderVerifiedUserGuard)
    updateById (
        @Param('id') id: string,
        @Body() updateData: ThemeUpdateType,
    ) {
        return this._themeService.updateById(id, updateData);
    }

    @Delete('/:id')
    @UseGuards(HeaderVerifiedUserGuard)
    deleteById (
        @Param('id') id: string,
    ) {
        return this._themeService.deleteById(id);
    }
}