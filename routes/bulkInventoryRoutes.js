const express = require('express');
const bulkInventoryController = require('../controllers/bulkInventoryController');

const router = express.Router();

router.get('/', bulkInventoryController.getAllBulkInventory);
router.get('/:id', bulkInventoryController.getBulkInventoryById);
router.post('/', bulkInventoryController.createBulkInventory);
router.put('/:id', bulkInventoryController.updateBulkInventory);
router.delete('/:id', bulkInventoryController.deleteBulkInventory);

module.exports = router;