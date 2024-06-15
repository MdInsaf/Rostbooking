const express = require('express');
const router = express.Router();
const roomRatesController = require('../controllers/roomRatesController');
const { createRoomRateValidationRules, validateCreateRoomRate } = require('../validationMiddleware');

router.get('/', roomRatesController.getAllRoomRates);
router.get('/:id', roomRatesController.getRoomRateById);
router.post('/', createRoomRateValidationRules, validateCreateRoomRate, roomRatesController.createRoomRate);
router.put('/:id', roomRatesController.updateRoomRate);
router.delete('/:id', roomRatesController.deleteRoomRate);

module.exports = router;
