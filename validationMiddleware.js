const { body, validationResult } = require('express-validator');

exports.validateCreateReservation = [
  body('hotelName').notEmpty().isString(),
  body('hotelAddress').notEmpty().isString(),
  body('themeColor').notEmpty().isString(),
  body('created_by').notEmpty().isString(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: 0, errors: errors.array() });
    }
    next();
  }
];

exports.validateCreateFacility = [
  body('Name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
  body('SortNo').notEmpty().withMessage('SortNo is required').isInt().withMessage('SortNo must be an integer'),
  body('CreatedBy').notEmpty().withMessage('CreatedBy is required').isString().withMessage('CreatedBy must be a string'),
  body('Status').notEmpty().withMessage('Status is required').isString().withMessage('Status must be a string'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: 0, errors: errors.array() });
    }
    next();
  }
];

exports.createRoomRateValidationRules = [
  body('Name').notEmpty().withMessage('Name is required'),
  body('Color').optional(),
  body('ActualCost').notEmpty().isNumeric().withMessage('ActualCost must be a number'),
  body('FinalCost').notEmpty().isNumeric().withMessage('FinalCost must be a number'),
  body('SortNo').notEmpty().isNumeric().withMessage('SortNo must be a number'),
  body('Status').notEmpty().isIn(['active', 'inactive']).withMessage('Status must be active or inactive'),
  body('CreatedBy').notEmpty().withMessage('CreatedBy is required'),
];

// Middleware function to validate createRoomRate request
exports.validateCreateRoomRate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


const Joi = require('joi');

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
    facilities: Joi.string().required(),
    category_id: Joi.number().integer().required()
});

exports.validateRoom = (req, res, next) => {
    const { error, value } = roomSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map(detail => detail.message);
        console.log(errors);
        return res.status(400).json({ success: 0, errors });
    }

    req.validatedData = value;
    next();
};
