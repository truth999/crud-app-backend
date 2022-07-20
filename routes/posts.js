const express = require('express');
const { body } = require('express-validator');

const postsController = require('../controllers/posts');

const router = express.Router();

router.get('/', postsController.getPosts);

router.post(
  '/',
  [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('content')
      .trim()
      .isLength({ min: 5 })
  ],
  postsController.createPost
);

router.get('/:postId', postsController.getPost);

router.put(
  '/:postId',
  [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('content')
      .trim()
      .isLength({ min: 5 })
  ],
  postsController.updatePost
);

router.delete('/:postId', postsController.deletePost);

module.exports = router;