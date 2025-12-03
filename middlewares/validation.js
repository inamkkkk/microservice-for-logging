const {logger} = require('../utils/logger');

exports.validateLog = (req, res, next) => {
    const { level, message, service } = req.body;

    if (!level || !message || !service) {
        logger.warn('Missing required fields in log data');
        return res.status(400).json({ message: 'Missing required fields: level, message, and service are required.' });
    }

    const allowedLevels = ['error', 'warn', 'info', 'debug', 'trace'];
    if (!allowedLevels.includes(level)) {
        logger.warn(`Invalid log level: ${level}`);
        return res.status(400).json({ message: 'Invalid log level. Allowed levels are: error, warn, info, debug, trace.' });
    }

    next();
};