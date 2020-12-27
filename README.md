Today I Learned
===============

Personal blog with things that I learn from time to time.

Stack info
==========

- /api: serverless functions for Vercel
- /blog: served static files
- /front: fronted JS files, bundled with rollup


How to run locally
==================

- Install vercel client `npm i -g vercel`
- On the root folder, run `vercel dev`
- Point endpoints to `localhost:3000`

Known Issues
============

Every push to repo launches a new vercel build. While this is not a huge problem, it would be better if adding posts to blog don't make the app rebuild.

Future Plans
============

Server-side rendering.