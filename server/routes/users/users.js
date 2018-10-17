const express = require('express');
const router = express.Router();
const uploadImages = require('./../../middleware/upload-image');
const verifyToken = require('./../../middleware/verifyToken');
const verifyTokenById = require('./../../middleware/verifyById');
const userController = require('./users.controller');


// /api/users
router.get('/',verifyToken, userController.getAllUsers);
router.post('/login', userController.getToken);
router.post('/register', userController.createUser);
router.get('/:id',verifyToken, userController.retrieveUser);
router.put('/upload/avatar/:id', verifyTokenById, uploadImages.single('avatar'), userController.uploadAvatar);

router.patch('/update',verifyToken ,userController.updateUser);

// router.delete();

module.exports = router;
