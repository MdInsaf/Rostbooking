const db = require('../config/database');
const moment = require('moment');

class BulkInventoryService {

    async createBulkInventory(inventory) {
        try {
            const { count, room_category, date_from, date_to, created_by } = inventory;

            if (!count || !room_category || !date_from || !date_to || !created_by) {
                throw new Error('Missing or invalid input data');
            }

            const startDate = moment(date_from);
            const endDate = moment(date_to);

            if (!startDate.isValid() || !endDate.isValid()) {
                throw new Error('Invalid date format');
            }
            const dates = [];
            let currentDate = startDate.clone();
            while (currentDate.isSameOrBefore(endDate, 'day')) {
                dates.push(currentDate.format('YYYY-MM-DD'));
                currentDate.add(1, 'day');
            }
            if (dates.length === 0) {
                throw new Error('No valid dates found to insert');
            }

            const insertValues = dates.map(date => [count, room_category, date, 'bulk', created_by]);
            const sql = "INSERT INTO inventory (count, room_category, date, inventory_type, created_by) VALUES ?";
            const result = await new Promise((resolve, reject) => {
                db.query(sql, [insertValues], function (err, result) {
                    if (err) {
                        console.error("Error in createBulkInventory:", err);
                        reject(err);
                    } else {
                        resolve({ affectedRows: result.affectedRows });
                    }
                });
            });

            return result;
        } catch (error) {
            console.error("Error in createBulkInventory:", error);
            throw new Error('Failed to create bulk inventory');
        }
    }

    async getAllBulkInventory() {
        const sql = 'SELECT * FROM inventory WHERE inventory_type = "bulk"';

        return new Promise((resolve, reject) => {
            db.query(sql, (err, result) => {
                if (err) {
                    console.error("Error in getAllBulkInventory:", err);
                    reject(new Error('Failed to get all bulk inventory'));
                } else {
                    resolve(result);
                }
            });
        });
    }

    async getBulkInventoryById(id) {
        const sql = 'SELECT * FROM inventory WHERE id = ? AND inventory_type = "bulk"';

        return new Promise((resolve, reject) => {
            db.query(sql, [id], (err, result) => {
                if (err) {
                    console.error("Error in getBulkInventoryById:", err);
                    reject(new Error('Failed to get bulk inventory by ID'));
                } else {
                    if (result.length === 0) {
                        reject(new Error('Bulk inventory not found'));
                    } else {
                        resolve(result[0]);
                    }
                }
            });
        });
    }

    async updateBulkInventory(id, inventory) {
        try {
            const { count, room_category, date_from, date_to, created_by } = inventory;

            if (!count || !room_category || !date_from || !date_to || !created_by) {
                throw new Error('Missing or invalid input data');
            }

            const sql = 'UPDATE inventory SET count = ?, room_category = ?, date = ?, created_by = ? WHERE id = ? AND inventory_type = "bulk"';
            const result = await new Promise((resolve, reject) => {
                db.query(sql, [count, room_category, date_from, date_to, created_by, id], (err, result) => {
                    if (err) {
                        console.error("Error in updateBulkInventory:", err);
                        reject(new Error('Failed to update bulk inventory'));
                    } else {
                        resolve({ id, ...inventory });
                    }
                });
            });

            return result;
        } catch (error) {
            console.error("Error in updateBulkInventory:", error);
            throw new Error('Failed to update bulk inventory');
        }
    }

    async deleteBulkInventory(id) {
        try {
            const sql = 'DELETE FROM inventory WHERE id = ? AND inventory_type = "bulk"';
            await db.query(sql, [id]);
            return { message: 'Bulk inventory deleted successfully' };
        } catch (error) {
            console.error("Error in deleteBulkInventory:", error);
            throw new Error('Failed to delete bulk inventory');
        }
    }
}

module.exports = new BulkInventoryService();
