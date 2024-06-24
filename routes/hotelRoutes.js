const express = require('express');
const router = express.Router();

module.exports = function(hotelController) {
  
  router.post('/hotel', (req, res) => {
    hotelController.createHotel(req, res);
  });

  router.get('/hotels', (req, res) => {
    hotelController.getHotels(req, res);
  });

  router.patch('/hotel/:id', (req, res) => {
    hotelController.updateHotel(req, res);
  });
  
  router.delete('/hotel/:id', (req, res) => {
    hotelController.deleteHotel(req, res);
  });
  
  return router;
};
