const UserId = require('../User/ValueObjects/UserId');
const TaskTitle = require('./valueObjects/TaskTitle');
const TaskCompleted = require('./valueObjects/TaskCompleted');


class Task {
    constructor(id, title, completed, userId) {
        this.id = id instanceof TaskID ? id : new TaskID(id);
        this.title = title instanceof TaskTitle ? title : new TaskTitle(title);
        this.completed = completed instanceof TaskCompleted ? completed : new TaskCompleted(completed);
        this.userId = userId instanceof UserId ? userId : new UserId(userId);
    }

    constructor(title, userId) {
        this.id = new TaskID();
        this.title = new TaskTitle(title);
        this.completed = new TaskCompleted(false);
        this.userId = userId instanceof UserId ? userId : new UserId(userId);
    }


    markAsCompleted() {
        this.completed = new TaskCompleted(true);
    }

    markAsPending() {
        this.completed = new TaskCompleted(false);
    }
}

module.exports = Task;