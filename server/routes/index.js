const express = require('express');
const router = express.Router();
const usersRouter = require('./users/users');
const postsRouter = require('./posts/posts')
// /api
router.use('/users', usersRouter);
router.use('/posts', postsRouter);

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
