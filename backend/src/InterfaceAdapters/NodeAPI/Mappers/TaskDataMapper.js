const Task = require('../../../Domain/Task/Task');
const TaskTitle = require('../../../Domain/Task/ValueObjects/TaskTitle');
const TaskCompleted = require('../../../Domain/Task/ValueObjects/TaskCompleted');
const UserId = require('../../../Domain/User/ValueObjects/UserId');

const TaskDataMapper = {
    
    toDomain(data) {
        if (!data) return null;
        return new Task(
            data._id,
            new TaskTitle(data.title),
            new TaskCompleted(data.completed),
            new UserId(data.userId)
        );
    },


    toDataModel(task) {
        return {
            _id: task.id.value,
            title: task.title.value,
            completed: task.completed.value,
            userId: task.userId.value
        };
    },
};

module.exports = TaskDataMapper;
