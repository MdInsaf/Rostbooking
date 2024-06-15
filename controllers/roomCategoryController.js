const roomCategoryService = require('../services/roomCategoryService');

const getAllCategories = (req, res) => {
    roomCategoryService.getAllCategories((err, categories) => {
        if (err) {
            console.error('Error fetching categories:', err);
            return res.status(500).json({ error: 'Failed to fetch categories' });
        }
        res.status(200).json(categories);
    });
};

const getCategoryById = (req, res) => {
    const id = req.params.id;
    roomCategoryService.getCategoryById(id, (err, category) => {
        if (err) {
            console.error('Error fetching category by ID:', err);
            return res.status(500).json({ error: 'Failed to fetch category' });
        }
        if (!category) {
            console.error('Category not found for ID:', id);
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    });
};

const createCategory = (req, res) => {
    const category = req.body;
    roomCategoryService.createCategory(category, (err, newCategory) => {
        if (err) {
            console.error('Error creating category:', err);
            return res.status(500).json({ error: 'Failed to create category' });
        }
        res.status(201).json(newCategory);
    });
};

const updateCategory = (req, res) => {
    const id = req.params.id;
    const category = req.body;
    roomCategoryService.updateCategory(id, category, (err, updatedCategory) => {
        if (err) {
            console.error('Error updating category:', err);
            return res.status(500).json({ error: 'Failed to update category' });
        }
        res.status(200).json(updatedCategory);
    });
};

const deleteCategory = (req, res) => {
    const id = req.params.id;
    roomCategoryService.deleteCategory(id, (err, result) => {
        if (err) {
            console.error('Error deleting category:', err);
            return res.status(500).json({ error: 'Failed to delete category' });
        }
        res.status(200).json({ message: 'Category deleted' });
    });
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};



