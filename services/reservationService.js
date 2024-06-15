const pool = require('../config/database');

// In roomRatesService.js
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


exports.getReservationById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Reservation WHERE id = ?', [id]);
    if (rows.length === 0) {
      throw new Error("Reservation not found");
    }
    const reservation = rows[0];
    
    reservation.heroImage = reservation.heroImage.toString('base64');
    reservation.logo = reservation.logo.toString('base64');
    return reservation;
  } catch (error) {
    console.error(`Error fetching reservation with id ${id}:`, error);
    throw error;
  }
};

const fs = require('fs');
const path = require('path');
require('dotenv').config();

exports.createReservation = async (reservationData, heroImageData, logoImageData) => {
  const { HotelName, HotelAddress, ThemeColor, created_by } = reservationData;

  try {
    const heroImagePath = path.join(__dirname, '..', process.env.HERO_IMAGE_UPLOAD_DIR, `${Date.now()}_heroImage.jpg`);
const logoImagePath = path.join(__dirname, '..', process.env.LOGO_IMAGE_UPLOAD_DIR, `${Date.now()}_logoImage.jpg`);
   
    fs.writeFileSync(heroImagePath, heroImageData);
    fs.writeFileSync(logoImagePath, logoImageData);

    const result = await new Promise((resolve, reject) => {
      pool.query(
        'INSERT INTO Reservation (HotelName, HotelAddress, ThemeColor, HeroImageFilePath, LogoImageFilePath, created_by) VALUES (?, ?, ?, ?, ?, ?)',
        [HotelName, HotelAddress, ThemeColor, heroImagePath, logoImagePath, created_by],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results);
        }
      );
    });

    if (result && result.insertId) {
      console.log('Inserted reservation ID:', result.insertId);

      const rows = await new Promise((resolve, reject) => {
        pool.query('SELECT * FROM Reservation WHERE id = ?', [result.insertId], (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results);
        });
      });

      if (rows.length === 0) {
        throw new Error('Failed to retrieve the newly created reservation.');
      }

      const newReservation = rows[0];
      
      return newReservation;
    } else {
      throw new Error("Failed to create reservation. Insertion failed.");
    }
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw error;
  }
};

exports.updateReservation = async (id, reservationData) => {
  const { hotelName, hotelAddress, themeColor } = reservationData;
  try {
    await pool.query('UPDATE Reservation SET hotelName=?, hotelAddress=?, themeColor=? WHERE id=?', [hotelName, hotelAddress, themeColor, id]);
    const updatedReservation = await this.getReservationById(id);
    return updatedReservation;
  } catch (error) {
    console.error(`Error updating reservation with id ${id}:`, error);
    throw error;
  }
};

exports.deleteReservation = async (id) => {
  try {
    await pool.query('DELETE FROM Reservation WHERE id = ?', [id]);
  } catch (error) {
    console.error(`Error deleting reservation with id ${id}:`, error);
    throw error;
  }
};
