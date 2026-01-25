class TaskTitle {

    constructor(title) {
        if (typeof title !== 'string' || title.trim() === '') {
            throw new Error('Task title must be a non-empty string.');
        }
        this.title = title;
    }
}

module.exports = TaskTitle;