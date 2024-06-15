const pool = require("../config/database");
const{
  createHotel,
  getHotelsWithImages,
  updateHotel,
  deleteHotel
} 
= require("../services/hotel.service");
const{genSaltSync, hashSync, compareSync } = require("bcrypt"); 
const {sign} = require("jsonwebtoken")
module.exports = {
      createHotel: (req,res)=>{
        const hotelData = req.body.hotelData;
        const imageData = req.body.imageData;

        createHotel(hotelData, imageData, (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
          return res.status(200).json({
              success: 1,
              data:result
          })
        });
      },
      getHotels(req, res) {
        getHotelsWithImages((err, hotels) => {
          if (err) {
            console.error('Error getting hotels:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
          return res.status(200).json({
              success: 1,
              data:hotels
          })
        });
      },    
      updateHotel(req, res) {
        const hotelId = req.params.id;
        const hotelData = req.body.hotelData;
        const imageData = req.body.imageData;
        updateHotel(hotelId, hotelData, imageData, (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
    
          return res.status(200).json({
              success: 1,
              data:result
          })
        });
      },
      deleteHotel(req, res) {
        const hotelId = req.params.id;
        deleteHotel(hotelId, (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
    
          return res.status(200).json({
              success: 1,
              data:result
          })
        });
      
        }
    };
    
