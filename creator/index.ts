import { promises } from 'fs';
import { join } from 'path';

const POSTS_ROOT = join(process.cwd(), '../blog/posts');
const INDEX_TEMPLATE = join(process.cwd(), 'templates/index.html');
const INDEX_SAVE_PATH = join(process.cwd(), '../blog/index.html');

const createMarkdown = (name: string) => `<zero-md src="posts/${name}"></zero-md>`;

const createBlog = async () => {
    const files: string[] = await promises.readdir(POSTS_ROOT);
    if (!files) {
        console.log(`Files not found in ${POSTS_ROOT}.`);
        return;
    }
    const res = await Promise.all(
        files.map(async name => {
            const { birthtime: date } = await promises.stat(`${POSTS_ROOT}/${name}`);
            return { date, name };
        })
    );

    const template = await promises.readFile(INDEX_TEMPLATE);
    const html = Buffer.from(template).toString();

    const begin = '<div class="posts">';
    const header = '<h1>TIL - a personal blog</h1><h2>by Carmon <a href="https://github.com/carmon/til">check repo</a></h2>';
    const tags = res.reduce(
        (prev, curr) => {
            const { date, name } = curr;
            const [d,h] = date.toJSON().split('T');
            const time = d.split('-').reverse().join('/');
            const hour = h.slice(0, h.lastIndexOf(':'));
            const data = `<div class="data">${time} ${hour} |<a href="index.html?file=${name}">${name}</a></div>`;
            return `${prev}${data}${createMarkdown(name)}`;
        },
        begin + header);
    const end = '</div>';
    await promises.writeFile(INDEX_SAVE_PATH, html.replace('<div id="root"></div>', `<div id="root">${tags+end}</div>`), "utf-8");
};

createBlog();
