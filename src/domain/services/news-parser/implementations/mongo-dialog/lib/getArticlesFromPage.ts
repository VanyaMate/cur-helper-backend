import * as jsdom from 'jsdom';
import {
    DomainNews,
} from '@vanyamate/cur-helper-types/types/news/DomainNews';


export const getArticlesFromPage = function (text: string): DomainNews[] {
    const dom                    = new jsdom.JSDOM(text);
    const document               = dom.window.document;
    const articleDomElements     = document.querySelectorAll(`.post-preview-big, .post-preview`);
    const articles: DomainNews[] = [];

    articleDomElements.forEach((articleDom) => {
        const urlElement         = articleDom.querySelector(`a`);
        const previewElement     = articleDom.querySelector(`.thumbnail`);
        const titleElement       = articleDom.querySelector(`figcaption > .post_preview-title, figcaption > .title`);
        const descriptionElement = articleDom.querySelector(`figcaption > .post-preview-description, figcaption > small`);
        const dateElement        = articleDom.querySelector('time.post-preview-time');

        if (urlElement) {
            const preview: string = previewElement?.getAttribute('style').match(/url\((.*?)\)/)?.[1]
                ?? '';

            const article: DomainNews = {
                key        : urlElement.href.match(/https:\/\/dialog\.info\/(.*?)\//)?.[1] ?? '',
                preview    : preview,
                title      : titleElement?.textContent ?? '',
                description: descriptionElement?.textContent ?? '',
                date       : dateElement?.getAttribute('datetime') ?? new Date().toUTCString(),
            };

            articles.push(article);
        }
    });

    return articles;
};