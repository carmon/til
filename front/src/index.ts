import fetch from 'node-fetch';

const urlParams = new URLSearchParams(window.location.search);
const file = urlParams.get('file');

const root = document.getElementById("root");
const posts = document.createElement("div");
posts.className = "posts";
posts.innerHTML = "<h2>Loading...</h2>";
root.append(posts);

const header = '<h1>TIL - a personal blog</h1><h2>by Carmon <a href="https://github.com/carmon/til">check repo</a></h2>';
const createMarkdown = (name: string) => `<zero-md src="posts/${name}"></zero-md>`;

if (file) {
    posts.innerHTML = `${header}${createMarkdown(file)}<div class="data"><a href="index.html">Back</a></div>`;
} else {
    fetch('api/get-posts', { method: 'GET' }).then(async res => {
        const json = await res.json();
        const tags = json.reduce(
            (prev, curr) => {
                const { date, name } = curr;
                const [d,h] = date.split('T');
                const time = d.split('-').reverse().join('/');
                const hour = h.slice(0, h.lastIndexOf(':'));
                const data = `<div class="data">${time} ${hour} |<a href="index.html?file=${name}">${name}</a></div>`;
                return `${prev}${data}${createMarkdown(name)}`;
            },
            header);
        posts.innerHTML = tags;
    });
}
