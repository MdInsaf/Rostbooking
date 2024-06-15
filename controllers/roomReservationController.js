const RoomReservationService = require('../services/roomReservationService');

class RoomReservationController {
    static async createReservation(req, res) {
        try {
            const data = req.body;
            const result = await RoomReservationService.createReservation(data);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateReservation(req, res) {
        try {
            const id = req.params.id;
            const data = req.body;
            const result = await RoomReservationService.updateReservation(id, data);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteReservation(req, res) {
        try {
            const id = req.params.id;
            const result = await RoomReservationService.deleteReservation(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAllReservations(req, res) {
        try {
            const result = await RoomReservationService.getAllReservations();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getReservationById(req, res) {
        try {
            const id = req.params.id;
            const result = await RoomReservationService.getReservationById(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = RoomReservationController;
