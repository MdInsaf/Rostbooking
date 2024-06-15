const express = require('express');
const router = express.Router();
const facilitiesController = require('../controllers/facilitiesController');
const { validateCreateFacility } = require('../validationMiddleware');

router.post('/facilities', facilitiesController.createFacility, validateCreateFacility);
router.get('/facilities', facilitiesController.getAllFacilities);
router.put('/facilities/:id', facilitiesController.updateFacility, validateCreateFacility);
router.delete('/facilities/:id', facilitiesController.deleteFacility);

module.exports = router;


