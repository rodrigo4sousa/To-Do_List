const taskMapper = require('../mappers/TaskMapper');
const Task = require('../../Domain/Task/Task');
const UserId = require('../../Domain/User/ValueObjects/UserId');
const TaskID = require('../../Domain/Task/ValueObjects/TaskID');
const TaskTitle = require('../../Domain/Task/ValueObjects/TaskTitle');
const TaskCompleted = require('../../Domain/Task/ValueObjects/TaskCompleted');

class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    async createTask(data) {
        const task = new Task(new TaskID(), new TaskTitle(data.title), new TaskCompleted(false), new UserId(data.userId));
        await this.taskRepository.save(task);
        return taskMapper.toDto(task);
    }

    async getTasks(userId) {
        const tasks = await this.taskRepository.findByUserId(userId);
        return tasks.map(task => taskMapper.toDto(task));
    }


    async completeTask(taskId) {
        const task = await this.taskRepository.findById(taskId);
        if (!task) return null;

        task.markAsCompleted();
        await this.taskRepository.update(task);
        return taskMapper.toDto(task);
    }

    async deleteTask(taskId) {
        const task = await this.taskRepository.findById(taskId);
        if (!task) return null;

        await this.taskRepository.delete(task.id.value);
        return true;
    }
}

module.exports = TaskService;