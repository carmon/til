import { readdir } from 'fs';
import { join } from 'path';
import { NowRequest, NowResponse } from '@vercel/node';

export default (_: NowRequest, res: NowResponse) => {
    readdir(join(process.cwd(), 'blog/posts'), (err, files) => {
        if (err) res.status(200).send(err);
        res.status(200).send(files);
    });
}