import fetch from 'node-fetch';

const root = document.getElementById("root");

const title = document.createElement("h1");
title.textContent = "TIL - a personal blog";
root.append(title);

const parent = document.createElement("div");
parent.className = "posts"
root.append(parent);

fetch('/posts', { method: 'GET' }).then(async res => {
    const div = document.createElement("div");
    const tags = await res.text();
    div.innerHTML = tags;
    parent.append(div);
});
