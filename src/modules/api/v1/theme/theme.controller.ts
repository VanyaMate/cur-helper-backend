import {
    Body,
    Controller, Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { ThemeService } from '@/modules/api/v1/theme/theme.service';
import { ThemeCreateType, ThemeUpdateType } from '@/domain/services/theme/theme.types';


@Controller('/api/v1/theme')
export class ThemeController {
    constructor (private readonly _themeService: ThemeService) {
    }

    @Post()
    createTheme (@Body() createData: ThemeCreateType) {
        return this._themeService.createTheme(createData);
    }

    @Get('/:id')
    getById (@Param('id') id: string) {
        return this._themeService.getById(id);
    }

    @Patch('/:id')
    updateById (
        @Param('id') id: string,
        @Body() updateData: ThemeUpdateType,
    ) {
        return this._themeService.updateById(id, updateData);
    }

    @Delete('/:id')
    deleteById (
        @Param('id') id: string,
    ) {
        return this._themeService.deleteById(id);
    }
}