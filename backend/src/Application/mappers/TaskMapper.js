const Task = require('../../Domain/Task/Task');
const TaskDto = require('../../InterfaceAdapters/NodeAPI/Dtos/Task/TaskDto');
const TaskTitle = require('../../Domain/Task/ValueObjects/TaskTitle');
const TaskCompleted = require('../../Domain/Task/ValueObjects/TaskCompleted');
const UserId = require('../../Domain/User/ValueObjects/UserId');

class TaskMapper {

    static toDto(task) {
        if (!task) return null;
        return new TaskDto({
            id: task.id.id,
            title: task.title.title,
            completed: task.completed.isCompleted
        });
    }
}

module.exports = TaskMapper;