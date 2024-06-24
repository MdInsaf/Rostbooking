const fs = require('fs');
const path = require('path');
const roomsService = require('../services/roomsServices');
const upload = require('../services/uploadService');      
exports.createRoom = async function createRoom(req, res) {
    try {
      const {
        hotel_id, room_name, short_description, max_childrens, max_adults,
        max_peoples, min_peoples, actual_cost, final_cost, home_page,
        tax, sort_no, no_of_rooms, facilities, category_id
      } = req.body;
  
      if (!req.files || !req.files['roomImage'] || !req.files['roomImage'][0]) {
        throw new Error('Room image is missing');
      }
  
      const roomImage = req.files['roomImage'][0].buffer;
  
      const newRoom = await roomsService.createRoom({
        hotel_id, room_name, short_description, max_childrens, max_adults,
        max_peoples, min_peoples, actual_cost, final_cost, home_page,
        tax, sort_no, no_of_rooms, facilities, category_id
      }, roomImage);
  
      res.status(201).json(newRoom);
    } catch (error) {
      console.error('Error creating room:', error);
      res.status(500).json({ error: error.message });
    }
  };




exports.getAllRooms = async (req, res, next) => {
    try {
        const results = await roomsServices.getAllRooms();
        res.json(results);
    } catch (error) {
        next(error);
    }
};

exports.getRoomById = async (req, res, next) => {
    const roomId = req.params.id;
    try {
        const results = await roomsServices.getRoomById(roomId);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json(results[0]);
    } catch (error) {
        next(error);
    }
};

exports.updateRoom = [
    upload.single('roomImage'),
    async (req, res, next) => {
        const roomId = req.params.id;
        try {
            const roomData = req.validatedData;
            const roomImage = req.file ? req.file.buffer : null;
            const result = await roomsServices.updateRoom(roomId, roomData, roomImage);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Room not found' });
            }
            res.json({ message: 'Room updated successfully' });
        } catch (error) {
            next(error);
        }
    }
];

exports.deleteRoom = async (req, res, next) => {
    const roomId = req.params.id;
    try {
        const result = await roomsServices.deleteRoom(roomId);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json({ message: 'Room deleted successfully' });
    } catch (error) {
        next(error);
    }
};
