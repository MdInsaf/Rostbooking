const bulkInventoryService = require('../services/bulkInventoryService');

class BulkInventoryController {
    async createBulkInventory(req, res) {
        try {
            const inventory = req.body;
            
            const result = await bulkInventoryService.createBulkInventory(inventory);
            
            res.status(201).json(result);
        } catch (error) {
            console.error("Error in createBulkInventory:", error);
            
            res.status(500).json({ error: error.message });
        }
    }

    async getAllBulkInventory(req, res) {
        try {
            const inventory = await bulkInventoryService.getAllBulkInventory();
            res.status(200).json(inventory);
        } catch (error) {
            console.error("Error in getAllBulkInventory:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getBulkInventoryById(req, res) {
        try {
            const { id } = req.params;
            const inventory = await bulkInventoryService.getBulkInventoryById(id);
            if (inventory) {
                res.status(200).json(inventory); 
            } else {
                res.status(404).json({ error: 'Bulk inventory not found' }); 
            }
        } catch (error) {
            console.error("Error in getBulkInventoryById:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async updateBulkInventory(req, res) {
        try {
            const { id } = req.params;
            const inventory = await bulkInventoryService.updateBulkInventory(id, req.body);
            res.status(200).json(inventory); 
        } catch (error) {
            console.error("Error in updateBulkInventory:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async deleteBulkInventory(req, res) {
        try {
            const { id } = req.params;
            await bulkInventoryService.deleteBulkInventory(id);
            res.status(200).json({ message: 'Bulk inventory deleted successfully' }); 
        } catch (error) {
            console.error("Error in deleteBulkInventory:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = new BulkInventoryController();
