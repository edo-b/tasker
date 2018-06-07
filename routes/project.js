const express = require('express');
const router = express.Router();

const projectController = require('../controllers/projectController');

router.get('/', projectController.get_list);
router.get('/:id', projectController.get_instance);

module.exports = router;