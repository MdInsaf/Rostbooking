const express = require('express');
const RoomReservationController = require('../controllers/roomReservationController');

const router = express.Router();

router.post('/', RoomReservationController.createReservation);
router.put('/:id', RoomReservationController.updateReservation);
router.delete('/:id', RoomReservationController.deleteReservation);
router.get('/', RoomReservationController.getAllReservations);
router.get('/:id', RoomReservationController.getReservationById);

module.exports = router;
