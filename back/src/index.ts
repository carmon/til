// import express = require('express');
// // Create a new express app instance
// const app: express.Application = express();
// app.get('/', function (req, res) {
// res.send('Hello World!');
// });
// app.listen(3000, function () {
// console.log('App is listening on port 3000!');
// });

import express from 'express';
import path from 'path';
import fs from 'fs';

import createLogger from './log';
const PATH_POST = 'posts';
const log = createLogger('/posts');

const app = express();
app.use('/posts', (_, res) => {
    fs.readdir(PATH_POST, { encoding: 'utf-8' }, (err, filenames) => {
        if (err) return log(err);        
        const mds = filenames.filter(el => /\.md$/.test(el))
        const tags = mds.reduce(
            (prev, curr) => 
                `${prev}<zero-md src="${curr}"></zero-md>`,
            '');
        res.send(tags);
    });
}, 
() => ({ status: 200 }));
app.use(express.static(path.join(__dirname, '../static')));
app.use(express.static(path.join(__dirname, '../posts')));
app.listen(3000, () => {
    console.log('App is listening on port 3000!');
});