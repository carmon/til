import fetch from 'node-fetch';

const root = document.getElementById("root");
const posts = document.createElement("div");
posts.className = "posts";
posts.innerHTML = "<h2>Loading...</h2>";
root.append(posts);

fetch('api/get-posts', { method: 'GET' }).then(async res => {
    const json = await res.json();
    const tags = json.reduce(
        (prev, curr) => {
            const { date, name } = curr;
            const [d,h] = date.split('T');
            const time = d.split('-').reverse().join('/');
            const hour = h.slice(0, h.lastIndexOf(':'));
            const data = `<div class="data">${time} ${hour} |<a href="./posts/${name}">${name}</a></div>`;
            return `${prev}${data}<zero-md src="posts/${name}"></zero-md>`;
        },
        '<h1>TIL - a personal blog</h1><h2>by Carmon <a href="https://github.com/carmon/til">check repo</a></h2>');
    posts.innerHTML = tags;
});