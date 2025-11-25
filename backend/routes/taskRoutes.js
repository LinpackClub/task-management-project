const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const requireAuth = require('../middlewares/requireAuth');
const checkRole = require('../middlewares/checkRole');

// GET /api/tasks/:projectId
router.get('/:projectId', requireAuth, taskController.getTasks);

// POST /api/tasks
// Example body: { "title": "Fix Bug", "assignee_id": "uuid", "priority": "HIGH" }
router.post('/', requireAuth, checkRole(['ADMIN', 'CORE']), taskController.createTask);

module.exports = router;