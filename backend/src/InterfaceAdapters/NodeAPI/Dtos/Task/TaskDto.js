class TaskDto {
    constructor({ id, title, completed }) {
        this.id = id;
        this.title = title;
        this.completed = completed;
    }
}

module.exports = TaskDto;