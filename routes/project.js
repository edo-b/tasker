const express = require('express');
const router = express.Router();

const projectController = require('../controllers/projectController');

router.get('/', projectController.get_list);
router.get('/:id', projectController.get_instance);

router.post('/', projectController.post_instance);

router.put('/:id', projectController.put_instance);

module.exports = router;