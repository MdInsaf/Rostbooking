class HotelController {
  constructor(hotelService) {
    this.hotelService = hotelService;
  }

  createHotel(req, res) {
    const hotelData = req.body.hotelData;
    const imageData = req.body.imageData;

    this.hotelService.createHotel(hotelData, imageData, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      res.status(200).json(result);
    });
  }

  getHotels(req, res) {
    this.hotelModel.getHotelsWithImages((err, hotels) => {
      if (err) {
        console.error('Error getting hotels:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.status(200).json({ hotels });
    });
  }

  updateHotel(req, res) {
    const hotelId = req.params.id;
    const hotelData = req.body.hotelData;
    const imageData = req.body.imageData;

    this.hotelService.updateHotel(hotelId, hotelData, imageData, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.status(200).json(result);
    });
  }

  deleteHotel(req, res) {
    const hotelId = req.params.id; 

    this.hotelService.deleteHotel(hotelId, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.status(200).json(result);
    });
  }
}

 
module.exports = HotelController;
