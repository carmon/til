import fetch from 'node-fetch';

const root = document.getElementById("root");
const posts = document.createElement("div");
posts.className = "posts";
root.append(posts);

fetch('api/get-posts', { method: 'GET' }).then(async res => {
    const json = await res.json();
    const tags = json.reduce(
        (prev, curr) => 
            `${prev}<zero-md src="posts/${curr}"></zero-md><a class="data" href="./posts/${curr}">${curr}</a>`,
        '<h1>TIL - a personal blog</h1>');
    posts.innerHTML = tags;
});