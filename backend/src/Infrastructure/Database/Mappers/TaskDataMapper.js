// TaskDataMapper.js
// Maps between Task domain model and Task data model (Mongoose)

const Task = require('../../Domain/Task/Task');
const TaskTitle = require('../../Domain/Task/valueObjects/TaskTitle');
const TaskCompleted = require('../../Domain/Task/valueObjects/TaskCompleted');
const UserId = require('../../../Domain/Task/ValueObjects/UserId');

const TaskDataMapper = {
    /**
     * Converts a data model (Mongoose doc or plain object) to a Task domain entity
     * @param {Object} data
     * @returns {Task}
     */
    toDomain(data) {
        if (!data) return null;
        return new Task(
            data._id,
            new TaskTitle(data.title),
            new TaskCompleted(data.completed),
            new UserId(data.userId)
        );
    },

    /**
     * Converts a Task domain entity to a plain object for the data model
     * @param {Task} task
     * @returns {Object}
     */
    toDataModel(task) {
        return {
            _id: task.id.value || task.id, // handle value object or string
            title: task.title.value || task.title,
            completed: task.completed.value || task.completed,
            userId: task.userId.value || task.userId
        };
    },

    /**
     * Converts a Task domain entity to a plain object for updating an existing data model
     * @param {string} id
     * @param {Task} task
     * @returns {Object}
     */
    toExistingDataModel(id, task) {
        return {
            _id: id,
            title: task.title.value || task.title,
            completed: task.completed.value || task.completed,
            userId: task.userId.value || task.userId
        };
    }
};

module.exports = TaskDataMapper;
