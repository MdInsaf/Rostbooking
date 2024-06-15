const db = require('../config/database');

class RoomReservationService {
    static generateBookingId() {
        return Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit number
    }

    static async createReservation(data) {
        const bookingId = this.generateBookingId();
        const { roomName, bookingStatus, bookingSource, bookingCreatedStartDate, bookingCreatedEndDate, bookingConfirmationDate, guestName, checkInStartDate, checkInEndDate, checkOutStartDate, checkOutEndDate, totalBookingAmount } = data;
        const sql = `INSERT INTO room_reservation (booking_id, room_name, booking_status, booking_source, booking_created_start_date, booking_created_end_date, booking_confirmation_date, guest_name, check_in_start_date, check_in_end_date, check_out_start_date, check_out_end_date, total_booking_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [bookingId, roomName, bookingStatus, bookingSource, bookingCreatedStartDate, bookingCreatedEndDate, bookingConfirmationDate, guestName, checkInStartDate, checkInEndDate, checkOutStartDate, checkOutEndDate, totalBookingAmount];
        
        return new Promise((resolve, reject) => {
            db.query(sql, values, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve({ bookingId, ...data });
            });
        });
    }

    static async updateReservation(id, data) {
        const { roomName, bookingStatus, bookingSource, bookingCreatedStartDate, bookingCreatedEndDate, bookingConfirmationDate, guestName, checkInStartDate, checkInEndDate, checkOutStartDate, checkOutEndDate, totalBookingAmount } = data;
        const sql = `UPDATE room_reservation SET room_name = ?, booking_status = ?, booking_source = ?, booking_created_start_date = ?, booking_created_end_date = ?, booking_confirmation_date = ?, guest_name = ?, check_in_start_date = ?, check_in_end_date = ?, check_out_start_date = ?, check_out_end_date = ?, total_booking_amount = ? WHERE booking_id = ?`;
        const values = [roomName, bookingStatus, bookingSource, bookingCreatedStartDate, bookingCreatedEndDate, bookingConfirmationDate, guestName, checkInStartDate, checkInEndDate, checkOutStartDate, checkOutEndDate, totalBookingAmount, id];

        return new Promise((resolve, reject) => {
            db.query(sql, values, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve({ bookingId: id, ...data });
            });
        });
    }

    static async deleteReservation(id) {
        const sql = `DELETE FROM room_reservation WHERE booking_id = ?`;

        return new Promise((resolve, reject) => {
            db.query(sql, [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve({ message: 'Reservation deleted successfully' });
            });
        });
    }

    static async getAllReservations() {
        const sql = `SELECT * FROM room_reservation`;

        return new Promise((resolve, reject) => {
            db.query(sql, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    static async getReservationById(id) {
        const sql = `SELECT * FROM room_reservation WHERE booking_id = ?`;

        return new Promise((resolve, reject) => {
            db.query(sql, [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results[0]);
            });
        });
    }
}

module.exports = RoomReservationService;
