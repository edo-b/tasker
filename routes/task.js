const express   = require('express');
const router    = express.Router();

const taskController = require('../controllers/taskController');

router.get('/', taskController.get_list);

router.post('/', taskController.post_instance);
router.put('/:id', taskController.put_instance);
router.delete('/:id', taskController.delete_intance);

module.exports = router;