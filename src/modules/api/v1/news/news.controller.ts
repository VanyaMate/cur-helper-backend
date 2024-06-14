import { Controller, Get, Param, Query } from '@nestjs/common';
import { NewsService } from '@/modules/api/v1/news/news.service';
import {
    NewsSearchOptionsDto,
} from '@/modules/api/v1/news/dto/news-search-options.dto';


@Controller('/api/v1/news')
export class NewsController {
    constructor (private readonly _service: NewsService) {
    }

    @Get(`/list`)
    getMany (@Query() searchOptions: NewsSearchOptionsDto) {
        return this._service.getMany(searchOptions);
    }

    @Get(`/:key`)
    get (@Param('key') key: string) {
        return this._service.get(key);
    }
}