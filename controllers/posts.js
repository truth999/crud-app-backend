const Post = require('../models/post');

const { validationResult } = require('express-validator');

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();

    res.status(200).json({
      message: 'Posts fetched successfully.',
      posts: posts
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error('Entered data is incorrect.');
      error.statusCode = 422;
      throw error;
    }

    const title = req.body.title;
    const content = req.body.content;

    const post = new Post({
      title: title,
      content: content
    });

    await post.save();

    res.status(201).json({
      message: 'Post created successfully.',
      post: post
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const post = await Post.findById(postId);

    if (!post) {
      const error = new Error('Could not find post.');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: 'Post fetched.',
      post: post
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error('Entered data is incorrect.');
      error.statusCode = 422;
      throw error;
    }

    const title = req.body.title;
    const content = req.body.content;

    const post = await Post.findById(postId);

    if (!post) {
      const error = new Error('Could not find post.');
      error.statusCode = 404;
      throw error;
    }

    post.title = title;
    post.content = content;

    const result = await post.save();

    res.status(200).json({
      message: 'Post updated successfully.',
      post: result
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    
    const post = await Post.findById(postId);

    if (!post) {
      const error = new Error('Could not find post.');
      error.statusCode = 404;
      throw error;
    }

    await Post.findByIdAndRemove(postId);

    res.status(200).json({
      message: 'Post deleted successfully.'
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};