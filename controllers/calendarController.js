const calendarService = require('../services/calendarService');

exports.getCalendarByMonth = async (req, res, next) => {
    try {
        const { month, year } = req.params;
        const result = await calendarService.getCalendarByMonth(month, year);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

exports.createCalendar = async (req, res, next) => {
    try {
        const calendar = req.body;
        const result = await calendarService.createCalendar(calendar);
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};

exports.updateCalendar = async (req, res, next) => {
    try {
        const { id } = req.params;
        const calendar = req.body;
        const result = await calendarService.updateCalendar(id, calendar);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

exports.deleteCalendar = async (req, res, next) => {
    try {
        const { id } = req.params;
        await calendarService.deleteCalendar(id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

exports.getAllCalendar = async (req, res, next) => {
    try {
        const result = await calendarService.getAllCalendar();
        res.json(result);
    } catch (err) {
        next(err);
    }
};

exports.getCalendarById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await calendarService.getCalendarById(id);
        res.json(result);
    } catch (err) {
        next(err);
    }
};
