import { promises } from 'fs';
import { join } from 'path';

const DATES_ROOT = join(process.cwd(), './dates.json');
const POSTS_ROOT = join(process.cwd(), '../blog/posts');
const INDEX_TEMPLATE = join(process.cwd(), 'templates/index.html');
const INDEX_SAVE_PATH = join(process.cwd(), '../blog/index.html');
debugger;

const createButton = (name: string) => `<button onclick="detail('${name}')">${name}</button>`;
const createMarkdown = (name: string) => `<zero-md src="posts/${name}"></zero-md>`;

const getTag = (name: string) => 
    name.includes('-') ? name.substring(0, name.lastIndexOf('-')) : '';

const createBlog = async () => {
    const files: string[] = await promises.readdir(POSTS_ROOT);
    if (!files) {
        console.log(`Files not found in ${POSTS_ROOT}.`);
        return;
    }

    const datesFile = await promises.readFile(DATES_ROOT);
    const datesJson = JSON.parse(Buffer.from(datesFile).toString());
    const res = files.map(name => ({ 
        date: new Date(datesJson[name]), 
        name,
        tag: getTag(name) 
    })).sort((a, b) => a.date > b.date ? -1 : 1);

    const template = await promises.readFile(INDEX_TEMPLATE);
    const html = Buffer.from(template).toString();

    const fn = `<script>
    const showAll = (id) => {
        let a = [...document.getElementsByClassName('post')];
        a.forEach(e => { e.hidden = false; }); 
        a.filter(e => e.id === id).forEach(e => {
            e.firstChild.firstElementChild.textContent = id;
            e.firstChild.firstElementChild.onclick = () => detail(id);
        });
    };
    const detail = id => {
        let a = [...document.getElementsByClassName('post')];
        a.forEach(e => { 
            const sel = e.id === id;
            e.hidden = !sel;
            if (sel) {
                e.firstChild.firstElementChild.textContent = 'back';
                e.firstChild.firstElementChild.onclick = () => showAll(id);
                e.firstChild.firstElementChild.blur();
            } 
        });
    };
    </script>`
    const begin = '<div class="blog">';
    const header = '<h1>TIL - a personal blog</h1><h2>by Carmon <a href="https://github.com/carmon/til">check repo</a></h2>';
    const markdowns = res.reduce(
        (prev, curr) => {
            const { date, name } = curr;
            const data = `<div class="data">${date.toLocaleString()} | ${createButton(name)}</div>`;
            const post = `<div id="${name}">${data}${createMarkdown(name)}</div>`;
            return `${prev}${post}`;
        },
        fn + begin + header);
    const end = '</div>';
    await promises.writeFile(INDEX_SAVE_PATH, html.replace('<div id="root"></div>', `<div id="root">${markdowns+end}</div>`), "utf-8");
};

createBlog();
