const {
  createHotel, 
  getHotels, 
  updateHotel, 
  deleteHotel 
} = require("../controllers/hotel.controller");

const router = require("express").Router();
const { checktoken } = require("../auth/token_validation");


router.post("/",checktoken, createHotel);
router.get("/",checktoken, getHotels);
router.patch("/:id",checktoken, updateHotel);
router.delete("/:id",checktoken,deleteHotel);

module.exports = router;
