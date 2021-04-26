Today I Learned
===============

Personal blog with things that I learn from time to time and development advances on self and other of my projects.

Stack info
==========

- /blog: served static files
- /create: a node app (TS) that serves as index.html creator

Branches and Github App info 
============================

- `main` is the blog main's branch, only modified by the user (git only atm)
- `prod` is __PRODUCTION__ branch in Vercel, it will be only modified by a PR made by a bot 
(merging the PR will be the same as *publishing a blog post*), to learn more about this
check utility repo [here](https://github.com/carmon/til-utils)

How to run locally
==================

In root folder:

- Run `build.sh` script
- Run `local-run.sh` script

Future plans
============

- Rudimentary file watcher