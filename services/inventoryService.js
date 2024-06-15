const db = require('../config/database');

exports.getAllInventory = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM inventory', (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

exports.getInventoryById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM inventory WHERE id = ?', [id], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results[0]);
        });
    });
};

exports.createInventory = (inventory) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO inventory SET ?', inventory, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve({ id: results.insertId, ...inventory });
        });
    });
};

exports.updateInventory = (id, inventory) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE inventory SET ? WHERE id = ?', [inventory, id], (error) => {
            if (error) {
                return reject(error);
            }
            resolve({ id, ...inventory });
        });
    });
};

exports.deleteInventory = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM inventory WHERE id = ?', [id], (error) => {
            if (error) {
                return reject(error);
            }
            resolve();
        });
    });
};

exports.saveInventory = (date, roomCategory, count) => {
    return new Promise((resolve, reject) => {
        const inventory = {
            date,
            room_category: roomCategory,
            count,
            created_at: new Date(),
            created_by: 'admin',
            inventory_type: 'single'
        };
        db.query('INSERT INTO inventory SET ?', inventory, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve({ id: results.insertId, ...inventory });
        });
    });
};
