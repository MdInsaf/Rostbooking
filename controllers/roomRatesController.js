const { body, validationResult } = require('express-validator');
const roomRatesService = require('../services/roomRatesService'); // Adjust the path as needed

exports.createRoomRate = async (req, res, next) => {
  try {
      const newRoomRateId = await roomRatesService.createRoomRate(req.body);
      console.log("Room rate created:", newRoomRateId); // Log room rate creation
      res.status(200).json({ id: newRoomRateId, message: "Room rate created" });
  } catch (error) {
      console.error("Error in createRoomRate:", error);
      res.status(500).json({
          error: "Internal server error",
          message: error.message,
          stack: error.stack
      });
  }
};

exports.getRoomRateById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const roomRate = await roomRatesService.getRoomRateById(id);
    if (roomRate) {
      res.status(200).json(roomRate);
    } else {
      res.status(404).json({ message: 'Room rate not found' });
    }
  } catch (error) {
    console.error("Error in getRoomRateById:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      stack: error.stack
    });
  }
};

exports.getAllRoomRates = (req, res) => {
  roomRatesService.getAllRoomRates((error, results) => {
      if (error) {
          console.error('Error in service:', error);
          return res.status(500).json({ error: 'Database query failed' });
      }
      console.log('Sending results to client:', results);
      res.status(200).json(results);
  });
};


exports.updateRoomRate = async (req, res, next) => {
  const id = req.params.id;
  try {
    await roomRatesService.updateRoomRate(id, req.body);
    res.status(200).json({ message: 'Room rate updated' });
  } catch (error) {
    console.error("Error in updateRoomRate:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      stack: error.stack
    });
  }
};

exports.deleteRoomRate = async (req, res, next) => {
  const id = req.params.id;
  try {
    await roomRatesService.deleteRoomRate(id);
    res.status(200).json({ message: 'Room rate deleted' });
  } catch (error) {
    console.error("Error in deleteRoomRate:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      stack: error.stack
    });
  }
};
