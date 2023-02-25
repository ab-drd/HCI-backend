const express = require('express');
const router = express.Router();
const comments = require('../services/comments');

router.get('/load', async function(req, res, next) {
    try {
        res.json(await comments.loadComments(req.query.slug));
    } catch (err) {
        console.error(`Error while getting comments for post: `, err.message);
        next(err);
    }
});

router.post('/create', async function(req, res, next) {
    try {
        res.json(await comments.insertComment(req.body));
    } catch (err) {
        console.error(`Error while creating comment: `, err.message);
        next(err);
    }
});

module.exports = router;