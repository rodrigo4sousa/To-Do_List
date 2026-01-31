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
            _id: task.id.id, 
            title: task.title.title,
            completed: task.completed.isCompleted,
            userId: task.userId.id
        };
    },


    toExistingDataModel(task) {
        return {
            title: task.title.title,
            completed: task.completed.isCompleted
        };
    }
};

module.exports = TaskDataMapper;
