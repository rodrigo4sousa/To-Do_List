class TaskCompleted {
    
    constructor(isCompleted) {
        if (typeof isCompleted !== 'boolean') {
            throw new Error('Task completed status must be a boolean.');
        }
        this.value = isCompleted;
        Object.freeze(this);
    }
}

module.exports = TaskCompleted;