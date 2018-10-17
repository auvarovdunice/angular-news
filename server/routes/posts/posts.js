const express = require('express');
const router = express.Router();
const uploadImages = require('./../../middleware/upload-image');
const verifyToken = require('./../../middleware/verifyToken');
const verifyTokenById = require('./../../middleware/verifyById');
const postController = require('./posts.controller');


// /api/posts
router.get('/',verifyToken, postController.getAllPosts);
// router.post('/create/:id',verifyToken, postController.createPost);
router.post('/create/:id', postController.createPost);
router.delete('/delete/:id', postController.deletePost);

// router.delete();

module.exports = router;
