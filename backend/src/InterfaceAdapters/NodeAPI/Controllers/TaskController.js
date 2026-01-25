const { CreateTaskDto } = require('../Dtos/Task/CreateTaskDto');

class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }


    //POST /tasks
    async createTask(req, res) {
        try {
            const newTask = await this.taskService.createTask(new CreateTaskDto(req.body));
            res.status(201).json(newTask);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    //GET /tasks
    async getTasks(res) {
        try {
            const tasks = await this.taskService.getTasks();
            res.status(200).json(tasks);
            
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


    //PATCH /tasks/:id
    async completeTask(req, res) {
        try {
            const taskId = req.params.id;
            const completedTask = await this.taskService.completeTask(taskId);
            if (completedTask) {
                res.status(200).json(completedTask);
            } else {
                res.status(404).json({ error: 'Task not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    //DELETE /tasks/:id
    async deleteTask(req, res) {
        try {
            const taskId = req.params.id;
            const deleted = await this.taskService.deleteTask(taskId);
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Task not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = TaskController;