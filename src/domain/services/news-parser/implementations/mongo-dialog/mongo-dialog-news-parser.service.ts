import {
    INewsParserService,
} from '@/domain/services/news-parser/news-parser-service.interface';
import { Model } from 'mongoose';
import { NewsModel } from '@/db/mongoose/news/news.model';
import {
    getArticlesFromPage,
} from '@/domain/services/news-parser/implementations/mongo-dialog/lib/getArticlesFromPage';
import {
    getBodyFromArticlePage,
} from '@/domain/services/news-parser/implementations/mongo-dialog/lib/getBodyFromArticlePage';


export class MongoDialogNewsParserService implements INewsParserService {
    private readonly _URL            = 'https://dialog.info/';
    private readonly _NEWS_MAIN_PAGE = 'https://dialog.info/news/';
    private readonly _NEWS_CONT_PAGE = 'https://dialog.info/news/page/';

    constructor (
        private readonly _model: Model<NewsModel>,
    ) {
    }

    async parse (page: number): Promise<void> {
        // get main page
        // get all news
        // check all news in bd
        // if all news in bd -> break;
        // if some news not in bd -> add;
        // if all news not in bd -> add; -> getNextPage() -> repeat
        const mainPage       = page === 1 ? await this._getMainPage()
                                          : await this._getContPage(page);
        const articles       = getArticlesFromPage(mainPage);
        const articleKeys    = articles.map((article) => article.key);
        const parsedArticles = await this._model.find({
            key: { $in: articleKeys },
        });
        if (articles.length === parsedArticles.length) {
            // all news in bd
            return;
        } else if (parsedArticles.length === 0) {
            // none news in bd
            // save all news
            await this._model.create(articles);
            await Promise.all(
                articles.map((article) =>
                    this._getNewsPage(article.key)
                        .then(getBodyFromArticlePage)
                        .then((body) => this._model.updateOne({
                            key: article.key,
                        }, { body })),
                ),
            );
            return this.parse(page + 1);
        } else {
            // some news in bd
            // get not parsed news
            const notParsedNews = articles.filter((article) => !parsedArticles.some((parsedArticle) => parsedArticle.key === article.key));
            await this._model.create(notParsedNews);
            await Promise.all(
                notParsedNews.map((article) =>
                    this._getNewsPage(article.key)
                        .then(getBodyFromArticlePage)
                        .then((body) => this._model.updateOne({
                            key: article.key,
                        }, { body })),
                ),
            );
            return;
        }
    }

    private async _getMainPage () {
        return fetch(this._NEWS_MAIN_PAGE, { method: 'GET' }).then((response) => response.text());
    }

    private async _getNewsPage (url: string) {
        return fetch(this._URL + url, { method: 'GET' }).then((response) => response.text());
    }

    private async _getContPage (page: number) {
        return fetch(this._NEWS_CONT_PAGE + page, { method: 'GET' }).then((response) => response.text());
    }
}