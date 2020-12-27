import { promises } from 'fs';
import { join } from 'path';
import { NowRequest, NowResponse } from '@vercel/node';

const ROOT = join(process.cwd(), 'blog/posts');

export default async (_: NowRequest, res: NowResponse) => {
    const files: string[] = await promises.readdir(ROOT);
    if (!files) res.status(200).send(`Files not found in ${ROOT}.`);
    res.status(200).send(await Promise.all(
        files.map(async name => {
            const { birthtime: date } = await promises.stat(`${ROOT}/${name}`);
            return { date, name };
        })
    ));
}