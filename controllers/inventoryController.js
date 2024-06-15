const inventoryService = require('../services/inventoryService');

exports.getAllInventory = async (req, res) => {
    try {
        const inventory = await inventoryService.getAllInventory();
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getInventoryById = async (req, res) => {
    try {
        const inventory = await inventoryService.getInventoryById(req.params.id);
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createInventory = async (req, res) => {
    try {
        const inventory = await inventoryService.createInventory(req.body);
        res.status(201).json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateInventory = async (req, res) => {
    try {
        const inventory = await inventoryService.updateInventory(req.params.id, req.body);
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteInventory = async (req, res) => {
    try {
        await inventoryService.deleteInventory(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.saveInventory = async (req, res) => {
    const { date, roomcategory, count } = req.query;
    try {
        const inventory = await inventoryService.saveInventory(date, roomcategory, count);
        res.status(201).json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
