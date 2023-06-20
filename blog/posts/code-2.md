Making a cool UUID hash
=======================

This month was my last working at my current job and I started checking cool things I did there. While most of the code it's under a non-disclosure agreement, I had the opportunity to share with a user the way we use a hash on a route to identify files.

Before I start I just want to point that this code is based on [a Coding Horror post](https://blog.codinghorror.com/equipping-our-ascii-armor/) on how to represent the 128 bits of a UUID in 20 or so characters. This original code is written in VB.net but I applied the same principles. Basically the gist is a function that takes an UUID, stripes the `-`, and populates a buffer with a 16 bit integer concatenation which cames from a replaced string that secures that the character is correct. After that we get a base64 string based on that buffer, and add some regex operations to make it URL-safe (mostly remove all the `+`), we remove the final `==` strings of the b64 and we've got ourselves a URL secure UUID make with 22 strings.  

```
const args = process.argv.slice(2);

const uuidToBase64 = id => {
  const stripped = id.replace(/-/g, '');
  const true64 = Buffer.from(String.fromCharCode.apply(
    null,
    stripped
      .replace(/\r|\n/g, '')
      .replace(/([\da-fA-F]{2}) ?/g, '0x$1 ')
      .replace(/ +$/, '')
      .split(' ')
      .map(s => parseInt(s, 16))
  ), 'binary').toString('base64');
  return true64.replace(/\//g, '_').replace(/\+/g, '~').replace(/=+$/, ''); // replace non URL-safe characters
};

console.log(uuidToBase64(args[0]));
```

You can check the final gist [here](https://gist.github.com/carmon/ea9b784be11fe0ea90589f7175305359).
