const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');

router.get('/:month/:year', calendarController.getCalendarByMonth);
router.post('/', calendarController.createCalendar);
router.put('/:id', calendarController.updateCalendar);
router.delete('/:id', calendarController.deleteCalendar);
router.get('/', calendarController.getAllCalendar);
router.get('/:id', calendarController.getCalendarById);

module.exports = router;
