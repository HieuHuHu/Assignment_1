const express = require('express');
const articleRouter = require('./routes/articleRouter');
const commentRouter = require('./routes/commentRouter');
const articleCommentRouter = require('./routes/articleCommentRouter');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/articles', articleRouter);
app.use('/comments', commentRouter);
app.use('/article', articleCommentRouter);
app.use('/articles', articleCommentRouter);

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Article and Comment API is running',
        endpoints: [
            'GET /articles',
            'GET /comments',
            'GET /article/:id/comments'
        ]
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
