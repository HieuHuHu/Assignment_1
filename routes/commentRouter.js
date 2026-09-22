const express = require('express');
const { readData, writeData, getId } = require('./dataStore');

const router = express.Router();

function validateCommentBody(body) {
	if (!body || !Number.isInteger(body.articleId) || body.articleId <= 0 ||
		typeof body.author !== 'string' || !body.author.trim() ||
		typeof body.content !== 'string' || !body.content.trim() ||
		typeof body.date !== 'string' || !body.date.trim()) {
		return 'articleId, author, content, and date are required';
	}
	return null;
}

router.get('/', async (req, res) => {
	const data = await readData();
	res.status(200).json(data.comments);
});

router.get('/:id', async (req, res) => {
	const id = getId(req.params.id);
	const data = await readData();
	const comment = id === null ? undefined : data.comments.find((item) => item.id === id);

	if (!comment) {
		return res.status(404).json({ message: 'Comment not found' });
	}

	res.status(200).json(comment);
});

router.post('/', async (req, res) => {
	const validationError = validateCommentBody(req.body);
	if (validationError) {
		return res.status(400).json({ message: validationError });
	}

	const data = await readData();
	const nextId = data.comments.reduce((highestId, comment) => Math.max(highestId, comment.id), 0) + 1;
	const comment = {
		id: nextId,
		...req.body,
		author: req.body.author.trim(),
		content: req.body.content.trim(),
		date: req.body.date.trim()
	};

	data.comments.push(comment);
	await writeData(data);
	res.status(201).json(comment);
});

router.put('/:id', async (req, res) => {
	const id = getId(req.params.id);
	const data = await readData();
	const commentIndex = id === null ? -1 : data.comments.findIndex((comment) => comment.id === id);
	if (commentIndex === -1) {
		return res.status(404).json({ message: 'Comment not found' });
	}

	const validationError = validateCommentBody(req.body);
	if (validationError) {
		return res.status(400).json({ message: validationError });
	}

	const updatedComment = {
		...data.comments[commentIndex],
		...req.body,
		id,
		author: req.body.author.trim(),
		content: req.body.content.trim(),
		date: req.body.date.trim()
	};
	data.comments[commentIndex] = updatedComment;
	await writeData(data);
	res.status(200).json(updatedComment);
});

router.delete('/:id', async (req, res) => {
	const id = getId(req.params.id);
	const data = await readData();
	const commentIndex = id === null ? -1 : data.comments.findIndex((comment) => comment.id === id);
	if (commentIndex === -1) {
		return res.status(404).json({ message: 'Comment not found' });
	}

	data.comments.splice(commentIndex, 1);
	await writeData(data);
	res.status(204).send();
});

module.exports = router;
