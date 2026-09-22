const express = require('express');
const { readData, getId } = require('./dataStore');

const router = express.Router();

router.get('/:id/comments', async (req, res) => {
    const articleId = getId(req.params.id);
    const data = await readData();
    const articleExists = articleId !== null && data.articles.some((article) => article.id === articleId);

    if (!articleExists) {
        return res.status(404).json({ message: 'Article not found' });
    }

    const comments = data.comments.filter((comment) => comment.articleId === articleId);
    res.status(200).json(comments);
});

module.exports = router;
