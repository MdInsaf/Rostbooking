const express = require('express');
const router = express.Router();
const roomCategoryController = require('../controllers/roomCategoryController');

router.get('/categories', roomCategoryController.getAllCategories);
router.get('/categories/:id', roomCategoryController.getCategoryById);
router.post('/categories', roomCategoryController.createCategory);
router.put('/categories/:id', roomCategoryController.updateCategory);
router.delete('/categories/:id', roomCategoryController.deleteCategory);

module.exports = router;
