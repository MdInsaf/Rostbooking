const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const upload = require('../services/uploadService');

router.post('/', 
  upload.fields([{ name: 'heroImage', maxCount: 1 }, { name: 'logo', maxCount: 1 }]), 
  reservationController.createReservation
);

router.get('/', reservationController.getAllReservations);
router.get('/:id', reservationController.getReservationById);
router.put('/:id', reservationController.updateReservation);
router.delete('/:id', reservationController.deleteReservation);

module.exports = router;

