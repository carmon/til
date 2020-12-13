import fetch from 'node-fetch';

const root = document.getElementById("root");

const title = document.createElement("h1");
title.textContent = "TIL - a personal blog";
root.append(title);

const parent = document.createElement("div");
parent.className = "posts"
root.append(parent);

fetch(
    'https://functions.carmon.vercel.app/api/til-posts', 
    { method: 'GET' }
).then(async res => {
    const json = await res.json();
    const tags = json.reduce(
        (prev, curr) => 
            `${prev}<zero-md><script type="text/markdown">${curr.text}</script></zero-md>`,
        '');
    const div = document.createElement("div");
    div.innerHTML = tags;
    parent.append(div);
});
