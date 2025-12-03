const Log = require('../models/Log');
const { logger } = require('../utils/logger');

exports.createLog = async (req, res) => {
  try {
    const log = new Log(req.body);
    await log.save();
    logger.info(`Log created: ${log._id}`);
    res.status(201).json({ message: 'Log created successfully', logId: log._id });
  } catch (error) {
    logger.error(`Error creating log: ${error}`);
    res.status(500).json({ message: 'Failed to create log', error: error.message });
  }
};

exports.getLogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const logs = await Log.find().skip(skip).limit(limit).sort({ timestamp: -1 });
    const total = await Log.countDocuments();

    res.status(200).json({
      logs,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    logger.error(`Error getting logs: ${error}`);
    res.status(500).json({ message: 'Failed to get logs', error: error.message });
  }
};
