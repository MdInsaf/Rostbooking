const Joi = require('joi');
const roomsServices = require('../services/roomsServices');

const roomSchema = Joi.object({
    hotel_id: Joi.number().integer().required(),
    room_name: Joi.string().required(),
    short_description: Joi.string().required(),
    max_childrens: Joi.number().integer().min(0).max(2).default(2),
    max_adults: Joi.number().integer().valid(2, 3).required(),
    max_peoples: Joi.number().integer().min(2).max(10).required(),
    min_peoples: Joi.number().integer().min(1).max(Joi.ref('max_peoples')).required(),
    actual_cost: Joi.number().positive().required(),
    final_cost: Joi.number().positive().required(),
    home_page: Joi.string().uri().required(),
    tax: Joi.number().min(0).max(25000).required(),
    sort_no: Joi.number().integer().required(),
    no_of_rooms: Joi.number().integer().min(1).max(4).required(),
    facilities: Joi.string().required()
});

exports.validateRoom = (req, res, next) => {
    const { error, value } = roomSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map(detail => detail.message);
        console.log(errors);
        return res.status(400).json({ errors });
    }

    req.validatedData = value;
    next();
};

exports.createRoom = (req, res) => {
    // Check if req or req.body is undefined
    if (!req || !req.body) {
        return res.status(400).json({ error: "Request body is missing" });
    }

    const newRoom = req.body;

    const { error } = roomSchema.validate(newRoom);
    if (error) {
        return res.status(400).json({ error: error.details.map(detail => detail.message) });
    }

    roomsServices.createRoom(newRoom, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ id: results.insertId, message: 'Room Created successfully' });
    });
};

exports.getAllRooms = (req, res) => {
    roomsServices.getAllRooms((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

exports.getRoomById = (req, res) => {
    const roomId = req.params.id;
    roomsServices.getRoomById(roomId, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json(results[0]);
    });
};

exports.updateRoom = (req, res) => {
    const roomId = req.params.id;
    const updatedRoom = req.body;
    roomsServices.updateRoom(roomId, updatedRoom, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json({ message: 'Room updated successfully' });
    });
};
 
exports.deleteRoom = (req, res) => {
    const roomId = req.params.id;
    roomsServices.deleteRoom(roomId, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json({ message: 'Room deleted successfully' }); 
    });
};


