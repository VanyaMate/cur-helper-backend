import { Module } from '@nestjs/common';
import { NewsController } from '@/modules/api/v1/news/news.controller';
import { NewsService } from '@/modules/api/v1/news/news.service';
import { ServicesModule } from '@/modules/services/services.module';


@Module({
    controllers: [
        NewsController,
    ],
    providers  : [
        NewsService,
    ],
    imports    : [
        ServicesModule,
    ],
})
export class NewsModule {

}