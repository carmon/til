Today I Learned
===============

Personal blog with things that I learn from time to time.

Stack info
==========

- /api: serverless functions for Vercel
- /blog: served static files
- /front: frontend JS files, bundled with rollup

API behaviour
=============

`/get-posts.md` lists MD files in `blog/posts`, returning creation stat (currently not working) and filename.
`/posts/[post]` returns a HTML with embebed MD with `zero-md` tag, not being used, will return a copy of `index.html` in the future

Front behaviour
===============

`index.html` if no query string param named **file**, then call all posts, if param present, renders only one MD file and a back to clean index link.

How to run locally
==================

- Install vercel client `npm i -g vercel`
- On the root folder, run `vercel dev`
- Point endpoints to `localhost:3000`

Known Issues
============

- Every push to repo launches a new vercel build. While this is not a huge problem, it would be better if adding posts to blog don't make the app rebuild.

Future Plans
============

Server-side rendering.