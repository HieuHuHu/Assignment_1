const express = require('express');
const { readData, writeData, getId } = require('./dataStore');

const router = express.Router();

function validateArticleBody(body) {
	if (!body || typeof body.title !== 'string' || !body.title.trim() ||
		typeof body.content !== 'string' || !body.content.trim()) {
		return 'title and content are required';
	}
	return null;
}

router.get('/', async (req, res) => {
	const data = await readData();
	res.status(200).json(data.articles);
});

router.get('/:id', async (req, res) => {
	const id = getId(req.params.id);
	const data = await readData();
	const article = id === null ? undefined : data.articles.find((item) => item.id === id);

	if (!article) {
		return res.status(404).json({ message: 'Article not found' });
	}

	res.status(200).json(article);
});

router.post('/', async (req, res) => {
	const validationError = validateArticleBody(req.body);
	if (validationError) {
		return res.status(400).json({ message: validationError });
	}

	const data = await readData();
	const nextId = data.articles.reduce((highestId, article) => Math.max(highestId, article.id), 0) + 1;
	const article = {
		id: nextId,
		...req.body,
		title: req.body.title.trim(),
		content: req.body.content.trim()
	};

	data.articles.push(article);
	await writeData(data);
	res.status(201).json(article);
});

router.put('/:id', async (req, res) => {
	const id = getId(req.params.id);
	const data = await readData();
	const articleIndex = id === null ? -1 : data.articles.findIndex((article) => article.id === id);
	if (articleIndex === -1) {
		return res.status(404).json({ message: 'Article not found' });
	}

	const validationError = validateArticleBody(req.body);
	if (validationError) {
		return res.status(400).json({ message: validationError });
	}

	const updatedArticle = {
		...data.articles[articleIndex],
		...req.body,
		id,
		title: req.body.title.trim(),
		content: req.body.content.trim()
	};
	data.articles[articleIndex] = updatedArticle;
	await writeData(data);
	res.status(200).json(updatedArticle);
});

router.delete('/:id', async (req, res) => {
	const id = getId(req.params.id);
	const data = await readData();
	const articleIndex = id === null ? -1 : data.articles.findIndex((article) => article.id === id);
	if (articleIndex === -1) {
		return res.status(404).json({ message: 'Article not found' });
	}

	data.articles.splice(articleIndex, 1);
	await writeData(data);
	res.status(204).send();
});

module.exports = router;
