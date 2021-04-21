import { promises } from 'fs';
import { join } from 'path';

const DATES_ROOT = join(process.cwd(), './dates.json');
const POSTS_ROOT = join(process.cwd(), '../blog/posts');
const INDEX_TEMPLATE = join(process.cwd(), 'templates/index.html');
const INDEX_SAVE_PATH = join(process.cwd(), '../blog/index.html');

const createTagLink = (tag: string) => `<a style="margin-right:2px;" href="?${tag}">${tag}</a>`;
const createShowButton = (attr: string) => `<button onclick="show('${attr}')">${attr}</button>`;
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

    const tags = res.reduce((prev, { tag }) => {
        if (!tag) return prev;
        if (prev.includes(tag)) return prev;

        return [...prev, tag];
    }, [])

    const fn = `<script>
    window.onload = () => {
        const queryString = window.location.search;
        if (!queryString || queryString.charAt(0) !== '?') return;
        
        const targetTag = queryString.substr(1);
        if (![${tags.map(t => `'${t}'`)}].includes(targetTag)) return;

        const back = document.createElement('div');
        back.style.backgroundColor = 'black';
        back.style.color = 'white';
        back.style.display = 'flex';
        back.style.justifyContent = 'center';
        back.style.margin = '5px 0';
        back.style.padding = '5px 0';
        back.style.fontFamily = 'monospace';
        back.innerHTML = 'CURRENTLY VIEWING <b style="color: cyan; font-size: 14px; margin: 0 5px;">' + targetTag.toUpperCase() + '</b> TAG, CLICK <a style="color: red; font-size: 14px; margin: 0 5px;" href="'+ window.location.origin +'">HERE</a> TO REMOVE TAG FILTER.';

        const blog = document.getElementsByClassName('blog')[0];
        blog.insertBefore(back, blog.children[2]); 
        
        [...document.getElementsByClassName('post')].forEach(e => { 
            e.hidden = !e.id.includes(targetTag);
        });
    };

    const showAll = id => {
        const a = [...document.getElementsByClassName('post')];
        a.forEach(e => { e.hidden = false; }); 
        a.filter(e => e.id === id).forEach(e => {
            e.firstChild.firstElementChild.textContent = id;
            e.firstChild.firstElementChild.onclick = () => show(id);
        });
    };
    const show = id => {
        [...document.getElementsByClassName('post')].forEach(e => { 
            const sel = e.id === id;
            e.hidden = !sel;
            if (sel) {
                e.firstChild.firstElementChild.textContent = 'back';
                e.firstChild.firstElementChild.onclick = () => showAll(id);
                e.firstChild.firstElementChild.blur();
            } 
        });
    };
    </script>`;
    const begin = '<div class="blog">';
    const header = '<h1>TIL - a personal blog</h1><h2>by Carmon <a href="https://github.com/carmon/til">check repo</a></h2>';
    const markdowns = res.reduce(
        (prev, curr) => {
            const { date, name, tag } = curr;
            const data = `<div class="data"> ${tag ? createTagLink(tag) : 'no tags'} | ${date.toLocaleString()} | ${createShowButton(name)}</div>`;
            const post = `<div id="${name}" class="post">${data}${createMarkdown(name)}</div>`;
            return `${prev}${post}`;
        },
        fn + begin + header);
    const end = '</div>';
    await promises.writeFile(INDEX_SAVE_PATH, html.replace('<div id="root"></div>', `<div id="root">${markdowns+end}</div>`), "utf-8");
};

createBlog();
