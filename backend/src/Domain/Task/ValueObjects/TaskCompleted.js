class TaskCompleted {
    
    constructor(isCompleted) {
        if (typeof isCompleted !== 'boolean') {
            throw new Error('Task completed status must be a boolean.');
        }
        this.isCompleted = isCompleted;
    }
}

module.exports = TaskCompleted;