const express = require('express');
const router = express.Router();
const users = require('../services/users');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await users.getAll(req.query.page));
  } catch (err) {
    console.error(`Error while getting users: `, err.message);
    next(err);
  }
});

router.post('/', async function(req, res, next) {
    try {
        res.json(await users.createNew(req.body));
    } catch (err) {
        console.error(`Error while creating new user`, err.message);
        next(err);
    }
});

module.exports = router;