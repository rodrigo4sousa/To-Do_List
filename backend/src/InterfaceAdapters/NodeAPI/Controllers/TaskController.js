class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }


    //POST /tasks
    async createTask(req, res) {
        try {
            const task = await this.taskService.createTask({
                title: req.body.title,
                userId: req.user.uid
            });
            res.status(201).json(task);
        } catch (err) {
            res.status(400).json({ error: err.message });   
        }
    }

    //GET /tasks
    async getTasks(req, res) {
        try {
            const tasks = await this.taskService.getTasks(req.user.uid);
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