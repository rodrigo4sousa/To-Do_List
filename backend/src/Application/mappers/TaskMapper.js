const Task = require('../../Domain/Task');
const TaskDto = require('../DTOs/TaskDto');

class TaskMapper {

    static toDomain(taskDto) {
        if (!taskDto) return null;

        return Task({
            title: taskDto.title,
            completed: taskDto.completed
        });
    }

    static toDto(task) {
        if (!task) return null;
        return new TaskDto({
            title: task.title,
            completed: task.completed
        });
    }
}

module.exports = TaskMapper;