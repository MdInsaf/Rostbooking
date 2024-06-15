const db = require('../config/database');

const getAllCategories = (callback) => {
    db.query('SELECT * FROM RoomCategory', (err, results) => {
        if (err) {
            console.error('Error fetching categories:', err);
            return callback(err);
        }
        console.log('Fetched categories:', results);
        callback(null, results);
    });
};

const getCategoryById = (id, callback) => {
    db.query('SELECT * FROM RoomCategory WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error fetching category by ID:', err);
            return callback(err);
        }
        if (results.length === 0) {
            return callback(null, null); 
        }
        console.log('Fetched category by ID:', results[0]);
        callback(null, results[0]);
    });
};

const createCategory = (category, callback) => {
    const { categoryName } = category;

    db.query('INSERT INTO RoomCategory (categoryName) VALUES (?)', [categoryName], (err, results) => {
        if (err) {
            console.error('Error creating category:', err);
            return callback(err);
        }
        
        const newCategory = {
            id: results.insertId,
            categoryName: categoryName
        };

        console.log('Category created:', newCategory);
        callback(null, newCategory);
    });
};

const updateCategory = (id, category, callback) => {
    const { categoryName } = category;

    db.query('UPDATE RoomCategory SET categoryName = ? WHERE id = ?', [categoryName, id], (err, results) => {
        if (err) {
            console.error('Error updating category:', err);
            return callback(err);
        }
        console.log('Category updated with ID:', id);
        callback(null, { id, categoryName });
    });
};

const deleteCategory = (id, callback) => {
    db.query('DELETE FROM RoomCategory WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error deleting category:', err);
            return callback(err);
        }
        console.log('Category deleted with ID:', id);
        callback(null, results);
    });
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
