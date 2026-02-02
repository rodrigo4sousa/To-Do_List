const Task = require('../../Domain/Task/Task');
const TaskDto = require('../../InterfaceAdapters/NodeAPI/Dtos/Task/TaskDto');
const TaskTitle = require('../../Domain/Task/ValueObjects/TaskTitle');
const TaskCompleted = require('../../Domain/Task/ValueObjects/TaskCompleted');
const UserId = require('../../Domain/User/ValueObjects/UserId');

class TaskMapper {

    static toDto(task) {
        if (!task) return null;
        return new TaskDto({
            id: task.id.value,
            title: task.title.value,
            completed: task.completed.value
        });
    }
}

module.exports = TaskMapper;