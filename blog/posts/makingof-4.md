Getting to know Github's APIs
=============================

Last couple of days I had a lot of fun and anger while working with Github's APIs.

The first thing I thought for *[til-utils](https://github.com/carmon/til-utils)* as a companion app for this blog was to make it a [Github Application](https://github.com/apps/til-blog-manager), this way it'll be more secured for Github users that aren't me. This started really strong and I was making some real progress as a nodejs app -in TS-, this app runs a http server that listens for the github app webhooks, specifically PUSH event webhook (if you work with github apps, this is the event you need to listen 90% of the times, it resembles a git push to a ref/branch in a repo), it loads a `config.json` file -check it [here](https://github.com/carmon/til/blob/main/config.json)- in the root of the affected repo, and check with that config is ref is `editing` (branch where user pushes new posts) or `production` (branch representing blog's production env).

**Where I am going with all this?** Well, the previous problem I had with `dates.json` file -see the second **makingof** post- it's now solver with a couple of github app magic: whenever the user pushes a new post file, and that files matches the glob expression on config, then the app uses it's bot to make a new PR with a new `dates.json` file.

I was glad with this new over-engineered but fully automated flow because it resembles a *blog publication* flow. But problems will appear in the horizon, as I tried to automate *more* things, it was very ambitious from my part.

**How to make a new repo in a github user account?** `git init` with a github API, WTF dude? Of course that's not posible, or it was, before Github released the [templates repos](https://docs.github.com/en/rest/reference/repos#create-a-repository-using-a-template). I started using the new experimental templates API but something was not working, and [as I supposed](https://github.community/t/create-repo-from-template-repo-using-a-github-app/177504), it [only works with github oauth apps](https://support.github.com/ticket/personal/0/1130717). So I had to make a new app: a [creator](https://github.com/marketplace/til-static-blog-creator) app.

### Future plans

**til=utils** repository for now will be divided in 2 apps: the github repo/static blog creator on one side -a github oauthapp-, below the name of [til-blog-creator](https://github.com/carmon/til-blog-creator) and the a github app, named [til-github-app](https://github.com/carmon/til-github-app), which will be the app for monitoring the future static blogs.

But both repos are empty ATM! I know, I'm still working on it, in fact, this blog post it's just an automation test in the end, I took too much time writing it...
