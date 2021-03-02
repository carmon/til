How is this blog made? #2
=========================

A friend of mine told me 'this blog could be static', so I removed all of the previous code.

Now a node app is run and generates the `index.html` file with all the MDs and some JS injection.
The result? Plain static page, avoid re-rendering, and fs stat working! well, sort of...

Sorting by didn't work in a serverless fashion, due to time of creation for files are empty.

With a [git log approach](https://github.com/carmon/til/blob/main/creator/get-dates.sh#L6) the thing just went as expected!

The next implementation will have to check if a md file is added to **posts** dir, then, run `get-dates.sh` before commiting and voilà :)