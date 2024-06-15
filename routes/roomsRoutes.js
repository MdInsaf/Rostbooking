const express = require('express');
const router = express.Router();
const roomsController = require('../controllers/roomsController');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });
const { validateRoom } = require('../validationMiddleware'); // Assuming the validation is in validationMiddleware.js

router.get('/', roomsController.getAllRooms);
router.get('/:id', roomsController.getRoomById);
router.post('/', 
  upload.fields([{ name: 'roomImage', maxCount: 1 }]), 
  roomsController.createRoom
);
router.patch('/:id', upload.single('roomImage'), validateRoom, roomsController.updateRoom);
router.delete('/:id', roomsController.deleteRoom);

module.exports = router;
