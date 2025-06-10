// routes/post.routes.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');

// leitura pública (com busca por ?q=palavra-chave)
router.get('/',        postController.getPosts);
router.get('/:slug',   postController.getPostBySlug);

// apenas admin pode gerenciar conteúdo
router.post('/',       protect, authorize('admin'), postController.createPost);
router.put('/:id',     protect, authorize('admin'), postController.updatePost);
router.delete('/:id',  protect, authorize('admin'), postController.deletePost);

module.exports = router;
