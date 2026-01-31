const UserId = require('../User/ValueObjects/UserId');
const TaskID = require('./ValueObjects/TaskID');
const TaskTitle = require('./ValueObjects/TaskTitle');
const TaskCompleted = require('./ValueObjects/TaskCompleted');


class Task {
    constructor(id, title, completed, userId) {
        this.id = id ? (id instanceof TaskID ? id : new TaskID(id)) : new TaskID();
        this.title = title instanceof TaskTitle ? title : new TaskTitle(title);
        this.completed = completed instanceof TaskCompleted ? completed : new TaskCompleted(completed);
        this.userId = userId ? (userId instanceof UserId ? userId : new UserId(userId)) : new UserId('default-user');
    }


    markAsCompleted() {
        this.completed = new TaskCompleted(true);
    }

    markAsPending() {
        this.completed = new TaskCompleted(false);
    }
}

module.exports = Task;