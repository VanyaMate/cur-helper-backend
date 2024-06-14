import * as jsdom from 'jsdom';


export const getBodyFromArticlePage = function (text: string): string {
    const dom      = new jsdom.JSDOM(text);
    const document = dom.window.document;

    const body = document.querySelector(`.articleContent`);
    if (body) {
        return body.innerHTML;
    } else {
        return null;
    }
};