// routes/category.routes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');

// leitura pública
router.get('/',        categoryController.getAllCategories);
router.get('/:slug',   categoryController.getCategoryBySlug);

// apenas admin pode modificar
router.post('/',       protect, authorize('admin'), categoryController.createCategory);
router.put('/:id',     protect, authorize('admin'), categoryController.updateCategory);
router.delete('/:id',  protect, authorize('admin'), categoryController.deleteCategory);

module.exports = router;
