const db = require('../config/database');

const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
};



exports.getCalendarByMonth = async (month, year) => {
    try {
        console.log(`Fetching calendar for month: ${month}, year: ${year}`);

        // Perform the query
        const queryResponse = await db.query(
            'SELECT date, SUM(count) as count FROM inventory WHERE MONTH(date) = ? AND YEAR(date) = ? GROUP BY date',
            [month, year]
        );

        // Log the full query response
        console.log("Full query response:", queryResponse);

        // Ensure queryResponse is an array
        if (!Array.isArray(queryResponse)) {
            console.error("Query response is not an array.");
            return [];
        }

        // Log detailed properties of the response
        console.log("Rows:", queryResponse);

        // Check if rows are valid
        if (queryResponse.length === 0) {
            console.error("Query response rows are empty.");
            return [];
        }

        return queryResponse;
    } catch (error) {
        console.error("An error occurred while fetching calendar data by month:", error);
        throw error;
    }
};

exports.createCalendar = async (calendar) => {
    try {
        const { count, room_category, date, inventory_type, created_at, created_by } = calendar;
        const [result] = await db.query(
            'INSERT INTO inventory (count, room_category, date, inventory_type, created_at, created_by) VALUES (?, ?, ?, ?, ?, ?)',
            [count, room_category, date, inventory_type, created_at, created_by]
        );
        return { id: result.insertId, ...calendar };
    } catch (error) {
        console.error("An error occurred while creating calendar data:", error);
        throw error;
    }
};

exports.updateCalendar = async (id, calendar) => {
    try {
        const { count, room_category, date, inventory_type, created_at, created_by } = calendar;
        await db.query(
            'UPDATE inventory SET count = ?, room_category = ?, date = ?, inventory_type = ?, created_at = ?, created_by = ? WHERE id = ?',
            [count, room_category, date, inventory_type, created_at, created_by, id]
        );
        return { id, ...calendar };
    } catch (error) {
        console.error("An error occurred while updating calendar data:", error);
        throw error;
    }
};

exports.deleteCalendar = async (id) => {
    try {
        await db.query('DELETE FROM inventory WHERE id = ?', [id]);
        return true;
    } catch (error) {
        console.error("An error occurred while deleting calendar data:", error);
        throw error;
    }
};

exports.getAllCalendar = async () => {
    try {
        const [results] = await db.query('SELECT * FROM inventory');
        if (!Array.isArray(results)) {
            console.error("Results from database query are not an array.");
            return [];
        }
        return results;
    } catch (error) {
        console.error("An error occurred while fetching all calendar data:", error);
        throw error;
    }
};

exports.getCalendarById = async (id) => {
    try {
        const [results] = await db.query('SELECT * FROM inventory WHERE id = ?', [id]);
        if (!Array.isArray(results) || results.length === 0) {
            console.error("No data found for the specified id.");
            return null;
        }
        return results[0];
    } catch (error) {
        console.error("An error occurred while fetching calendar data by id:", error);
        throw error;
    }
};
