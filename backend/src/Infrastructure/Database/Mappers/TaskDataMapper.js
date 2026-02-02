const Task = require('../../../Domain/Task/Task');
const TaskTitle = require('../../../Domain/Task/ValueObjects/TaskTitle');
const TaskCompleted = require('../../../Domain/Task/ValueObjects/TaskCompleted');
const UserId = require('../../../Domain/User/ValueObjects/UserId');

const TaskDataMapper = {
    
    toDomain(data) {
        if (!data) return null;
        let userId;
        try {
            userId = new UserId(data.userId);
        } catch {
            userId = new UserId();
        }
        return new Task(
            data._id,
            new TaskTitle(data.title),
            new TaskCompleted(data.completed),
            userId
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


    toExistingDataModel(task) {
        return {
            title: task.title.value,
            completed: task.completed.value
        };
    }
};

module.exports = TaskDataMapper;
