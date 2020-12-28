import { join } from 'path';
import { NowRequest, NowResponse } from '@vercel/node';

// Currently not been used, the idea is to return copy of index.html with zero-md tag

const notFound = (res: NowResponse, message: string) => 
    res.status(404).send({
      error: {
        code: 'not_found',
        message,
      },
    });

const ROOT = join(process.cwd(), 'blog/posts');

export default async (req: NowRequest, res: NowResponse) => {
    const ext = '.md';
    const { post = '' } = req.query;

    if (!post.includes(ext))
        return notFound(res, `Missing ${ext} suffix.`);
    
    res.status(200).send(`<zero-md src="${ROOT}/${post}"></zero-md>`);
}