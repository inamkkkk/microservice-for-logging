const express = require('express');
const router = express.Router();
const logsController = require('../controllers/logsController');
const { validateLog } = require('../middlewares/validation');

router.post('/', validateLog, logsController.createLog);
router.get('/', logsController.getLogs);

module.exports = router;