const express = require('express');
const articleRouter = require('./routes/articleRouter');
const commentRouter = require('./routes/commentRouter');
const { readData, getId } = require('./dataStore');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/articles', articleRouter);
app.use('/comments', commentRouter);

app.get('/article/:id/comments', async (req, res) => {
    const articleId = getId(req.params.id);
    const data = await readData();
    const articleExists = articleId !== null && data.articles.some((article) => article.id === articleId);

    if (!articleExists) {
        return res.status(404).json({ message: 'Article not found' });
    }

    res.status(200).json(data.comments.filter((comment) => comment.articleId === articleId));
});

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
