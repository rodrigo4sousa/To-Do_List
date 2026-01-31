const express = require('express');
const authMiddleware = require('../Middleware/authMiddleware');

module.exports = function (taskController) {
  const router = express.Router();

  // POST /tasks
  router.post(
    '/',
    authMiddleware,
    (req, res) => taskController.createTask(req, res)
  );

  // GET /tasks
  router.get(
    '/',
    authMiddleware,
    (req, res) => taskController.getTasks(req, res)
  );

  // PATCH /tasks/:id
  router.patch(
    '/:id',
    authMiddleware,
    (req, res) => taskController.completeTask(req, res)
  );

  // DELETE /tasks/:id
  router.delete(
    '/:id',
    authMiddleware,
    (req, res) => taskController.deleteTask(req, res)
  );

  return router;
};