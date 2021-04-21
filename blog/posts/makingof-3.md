Webhook to tweet testing
========================

I was about to write a really extesive post but I have to go,
so I will just use this post to check the twitter notification on post.

### How does it work?

Well it listens for a github app webhook (an app installed on the blog repo),
whenevers a file is added by git in the path specified (where the posts are),
it uses the github app to reads the contents of the file, gets the title
and then it uses that title to compose a tweet, with I send via [twitter-lite](https://www.npmjs.com/package/twitter-lite)
(don't forget to type this lib if using TS).

That's all for now, currently is a daemon web server but will be moved to 
a vercel API soon. Thanks for reading! 