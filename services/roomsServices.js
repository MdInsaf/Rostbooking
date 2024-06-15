const Joi = require('joi');
const db = require('../config/database');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Joi schema for room validation
const roomSchema = Joi.object({
    hotel_id: Joi.number().integer().required(),
    room_name: Joi.string().required(),
    short_description: Joi.string().required(),
    max_childrens: Joi.number().integer().min(0).max(2).default(2),
    max_adults: Joi.number().integer().valid(2, 3).required(),
    max_peoples: Joi.number().integer().min(2).max(10).required(),
    min_peoples: Joi.number().integer().min(1).max(Joi.ref('max_peoples')).required(),
    actual_cost: Joi.number().positive().required(),
    final_cost: Joi.number().positive().required(),
    home_page: Joi.string().uri().required(),
    tax: Joi.number().min(0).max(25000).required(),
    sort_no: Joi.number().integer().required(),
    no_of_rooms: Joi.number().integer().min(1).max(4).required(),
    facilities: Joi.string().required(),
    category_id: Joi.number().integer().required(),
    roomImage: Joi.string().optional()
});

// Function to get all rooms
const getAllRooms = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM rooms', (err, results) => {
            if (err) {
                console.error('Error getting rooms: ', err);
                reject('Error getting rooms');
                return;
            }
            resolve(results);
        });
    });
};

// Function to get a room by ID
const getRoomById = (roomId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM rooms WHERE id = ?', [roomId], (err, results) => {
            if (err) {
                console.error('Error getting room by ID: ', err);
                reject('Error getting room by ID');
                return;
            }
            if (results.length === 0) {
                reject('Room not found');
                return;
            }
            resolve(results[0]);
        });
    });
};

// Function to create a new room
const createRoom = async (roomData, roomImageData) => {
  const { error, value } = roomSchema.validate(roomData, { abortEarly: false });
  if (error) {
      throw new Error(`Validation error: ${error.details.map(detail => detail.message).join(', ')}`);
  }

  const {
      hotel_id, room_name, short_description, max_childrens, max_adults,
      max_peoples, min_peoples, actual_cost, final_cost, home_page,
      tax, sort_no, no_of_rooms, facilities, category_id
  } = value;

  try {
      let roomImagePath = null;
      if (roomImageData) {
          roomImagePath = path.join(__dirname, '..', process.env.ROOM_IMAGE_UPLOAD_DIR, `${Date.now()}_roomImage.jpg`);
          fs.writeFileSync(roomImagePath, roomImageData);
      }

      const result = await new Promise((resolve, reject) => {
          db.query(
              'INSERT INTO rooms (hotel_id, room_name, short_description, max_childrens, max_adults, max_peoples, min_peoples, actual_cost, final_cost, home_page, tax, sort_no, no_of_rooms, facilities, category_id, room_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
              [hotel_id, room_name, short_description, max_childrens, max_adults, max_peoples, min_peoples, actual_cost, final_cost, home_page, tax, sort_no, no_of_rooms, facilities, category_id, roomImagePath],
              (error, results) => {
                  if (error) {
                      console.error("Database insertion error:", error);
                      return reject(new Error('Database insertion failed'));
                  }
                  resolve(results);
              }
          );
      });

      if (result && result.insertId) {
          const newRoom = await getRoomById(result.insertId);
          return newRoom;
      } else {
          throw new Error("Failed to create room. Insertion result invalid.");
      }
  } catch (error) {
      console.error("Error creating room:", error);
      throw new Error('Failed to create room. An unexpected error occurred.');
  }
};


// Function to update an existing room
const updateRoom = async (roomId, updatedRoomData, roomImage) => {
    const { error, value } = roomSchema.validate(updatedRoomData, { abortEarly: false });
    if (error) {
        throw new Error(`Validation error: ${error.details.map(detail => detail.message).join(', ')}`);
    }

    try {
        let roomImagePath = null;
        if (roomImage) {
            roomImagePath = path.join(__dirname, '..', process.env.ROOM_IMAGE_UPLOAD_DIR, `${Date.now()}_roomImage.jpg`);
            fs.writeFileSync(roomImagePath, roomImage);
        }

        const query = 'UPDATE rooms SET ? WHERE id = ?';
        const values = roomImage
            ? [{ ...value, roomImage: roomImagePath }, roomId]
            : [{ ...value }, roomId];

        await new Promise((resolve, reject) => {
            db.query(query, values, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });

        const updatedRoom = await getRoomById(roomId);
        return updatedRoom;
    } catch (error) {
        console.error(`Error updating room with id ${roomId}:`, error);
        throw error;
    }
};

// Function to delete a room by ID
const deleteRoom = (roomId) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM rooms WHERE id = ?', [roomId], (err, result) => {
            if (err) {
                console.error(`Error deleting room with id ${roomId}:`, err);
                reject(`Error deleting room with id ${roomId}`);
                return;
            }
            resolve(result);
        });
    });
};

module.exports = {
    getAllRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom
};
