class TaskTitle {

    constructor(title) {
        if (typeof title !== 'string' || title.trim() === '') {
            throw new Error('Task title must be a non-empty string.');
        }
        if (title.length > 500) {
            throw new Error('Task title must not exceed 500 characters.');
        }
        this.value = title;
        Object.freeze(this);
    }
}

module.exports = TaskTitle;