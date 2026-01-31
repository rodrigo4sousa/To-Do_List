const { randomUUID } = require('crypto');

class TaskID {
    constructor(id) {
        this.id = id ?? randomUUID();
    }
}

module.exports = TaskID;