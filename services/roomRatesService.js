const pool = require('../config/database');

const getAllRoomRates = (callback) => {
    pool.query('SELECT * FROM roomrates', (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            return callback(error, null);
        }
        console.log('Query results:', results);
        return callback(null, results);
    });
};

const getRoomRateById = async (id) => {
    try {
        const [rows] = await pool.query('SELECT * FROM roomrates WHERE id = ?', [id]);
        return rows[0];
    } catch (error) {
        console.error("Error in getRoomRateById:", error);
        throw error; 
    }
};

const createRoomRate = async (data) => {
    try {
        const { Name, Color, ActualCost, FinalCost, SortNo, Status, CreatedBy } = data;
        const result = await pool.query(
            'INSERT INTO roomrates (Name, Color, ActualCost, FinalCost, SortNo, Status, CreatedBy) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [Name, Color, ActualCost, FinalCost, SortNo, Status, CreatedBy]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error in createRoomRate:", error);
        throw error;
    }
};

const updateRoomRate = async (id, data) => {
    try {
        const { Name, Color, ActualCost, FinalCost, SortNo, Status, CreatedBy } = data;
        await pool.query(
            'UPDATE roomrates SET Name = ?, Color = ?, ActualCost = ?, FinalCost = ?, SortNo = ?, Status = ?, CreatedBy = ? WHERE id = ?',
            [Name, Color, ActualCost, FinalCost, SortNo, Status, CreatedBy, id]
        );
    } catch (error) {
        console.error("Error in updateRoomRate:", error); 
        throw error; 
    }
};

const deleteRoomRate = async (id) => {
    try {
        await pool.query('DELETE FROM RoomRates WHERE id = ?', [id]);
    } catch (error) {
        console.error("Error in deleteRoomRate:", error); 
        throw error; 
    }
};

module.exports = {
    getAllRoomRates,
    getRoomRateById,
    createRoomRate,
    updateRoomRate,
    deleteRoomRate
};
