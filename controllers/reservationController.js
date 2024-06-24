const reservationService = require('../services/reservationService');
const upload = require('../services/uploadService');                                                                        
                                                                                                                                               
exports.getAllReservations = async (req, res, next) => {                                                                    
  try {                                                                                                                                            
    const reservations = await reservationService.getAllReservations();                                                    
    res.json(reservations);                                                                                                                                              
  } catch (error) {                                                                                                                                             
    next(error);                                                                                                                                               
  }                                                                                                                                               
};                                                                                                                                                
                                                                                                                                              
exports.getReservationById = async (req, res, next) => {                                                                                                                                              
  const id = req.params.id;                                                                                                                                           
  try {                                                                                                                                         
    const reservation = await reservationService.getReservationById(id);                                                                                        
    res.json(reservation);                                                                                                                                      
  } catch (error) {                                                                                                                                             
    next(error);                                                                                                                                               
  }
};

exports.createReservation = async function createReservation(req, res) {
  try {
    const { HotelName, HotelAddress, ThemeColor, created_by } = req.body;
    const heroImage = req.files['heroImage'][0].buffer;
    const logo = req.files['logo'][0].buffer;
    const newReservation = await reservationService.createReservation({
      HotelName, HotelAddress, ThemeColor, created_by
    }, heroImage, logo);

    res.status(201).json(newReservation);
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateReservation = async (req, res, next) => {
  const id = req.params.id;
  const reservationData = req.body;
  try {
    const updatedReservation = await reservationService.updateReservation(id, reservationData);
    res.json(updatedReservation);
  } catch (error) {
    next(error);
  }
};

exports.deleteReservation = async (req, res, next) => {
  const id = req.params.id;
  try {
    await reservationService.deleteReservation(id);
    res.json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    next(error);
  }
};

exports.uploadFile = (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError) {

      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(500).json({ message: 'An unexpected error occurred' });
    }

    res.status(200).json({ message: 'File uploaded successfully' });
  });
};
