const express = require('express');
const cors = require('cors');
const taskRoutes = require('./Routes/Tasks');
const TaskController = require('./Controllers/TaskController');
const TaskService = require('../../Application/services/TaskService');
const TaskRepository = require('../../Infrastructure/Repositories/TaskRepository');

const app = express();

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

app.use(cors());
app.use(express.json());
app.use('/tasks', taskRoutes(taskController));

module.exports = app;