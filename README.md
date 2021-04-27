Today I Learned
===============

Personal blog with things that I learn from time to time and development advances on self and other of my projects.

Dir info
========

- /blog: served static files
- /create: a node app (TS) that serves as index.html creator

Stack info
==========

This blog is administered from `TIL blog manager` github app (code [here](https://github.com/carmon/til-utils)),
right now the only implementation here is the `/creator` folder contents. You can configure it with `config.json`
file on the root of this repo.

## config.json properties

- **editing**: branch where you will post your work
- **production**: blog's production branch, this branch is *protected*
- **postsFormat**: blob format of the files that represents your posts, currently only supports `*.md`,
 you should post the complete destination with the folders from root
- **datesFile**: where is your `dates.json` file in the repo, this will be used for the `creator` to sort the posts

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