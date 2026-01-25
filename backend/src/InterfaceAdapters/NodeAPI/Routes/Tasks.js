const express = require('express');

module.exports = function(taskController) {
    const router = express.Router();

    // POST /tasks
    router.post('/tasks', (req, res) => taskController.createTask(req, res));

    // GET /tasks
    router.get('/tasks', (res) => taskController.getTasks(res));

    // PATCH /tasks/:id
    router.patch('/tasks/:id', (req, res) => taskController.completeTask(req, res));

    // DELETE /tasks/:id
    router.delete('/tasks/:id', (req, res) => taskController.deleteTask(req, res));

    return router;
};