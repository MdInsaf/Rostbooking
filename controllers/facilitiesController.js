const facilitiesService = require('../services/facilitiesService');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

exports.getAllFacilities = async (req, res, next) => {
  try {
    const facilities = await facilitiesService.getAllFacilities();
    res.status(200).json(facilities);
  } catch (error) {
    next(error);
  }
};

exports.createFacility = [
  upload.single('iconImage'),
  async (req, res, next) => {
    try {                                                                    
      const facilityData = req.body;                                                                    
      const iconImage = req.file ? req.file.buffer : null;                                                                    
      const result = await facilitiesService.createFacility(facilityData, iconImage);                                                                    
      res.status(201).json(result);                                                                    
    } catch (error) {                                                                    
      next(error);                                                                    
    }                                                                    
  }                                                                    
];                                                                    
                                                            
exports.updateFacility = [                                                                    
  upload.single('iconImage'),                                                                    
  async (req, res, next) => {                                                                    
    try {                                                                    
      const { id } = req.params;                                                                    
      const facilityData = req.body;                                                                    
      const iconImage = req.file ? req.file.buffer : null;                                                                    
      const result = await facilitiesService.updateFacility(id, facilityData, iconImage);                                                                    
      res.status(200).json(result);                                                                    
    } catch (error) {
      next(error);
    }
  }
];

exports.deleteFacility = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await facilitiesService.deleteFacility(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

