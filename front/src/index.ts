import fetch from 'node-fetch';

const root = document.getElementById("root");
const posts = document.createElement("div");
posts.className = "posts";
root.append(posts);

fetch('api/get-posts', { method: 'GET' }).then(async res => {
    const json = await res.json();
    const tags = json.reduce(
        (prev, curr) => 
            `${prev}<a class="data" href="./posts/${curr}">${curr}</a><zero-md src="posts/${curr}"></zero-md>`,
        '<h1>TIL - a personal blog</h1><h2>by Carmon <a href="https://github.com/carmon/til">check repo</a></h2>');
    posts.innerHTML = tags;
});