const taskMapper = require('../mappers/TaskMapper');

class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    async createTask(createTaskDto) {
        const task = taskMapper.toDomain(createTaskDto);
        await this.taskRepository.save(task);
        return taskMapper.toDto(task);
    }

    async getTasks() {
        const tasks = await this.taskRepository.findAll();
        return tasks.map(task => taskMapper.toDto(task));
    }

    async completeTask(taskId) {
        const task = await this.taskRepository.findById(taskId);
        if (!task) return null;

        task.completed = true;
        await this.taskRepository.save(task);
        return taskMapper.toDto(task);
    }

    async deleteTask(taskId) {
        const task = await this.taskRepository.findById(taskId);
        if (!task) return false;
        await this.taskRepository.delete(taskId);
        return true;
    }
}

module.exports = TaskService;