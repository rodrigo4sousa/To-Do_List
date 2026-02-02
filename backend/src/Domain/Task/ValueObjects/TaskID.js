const { randomUUID } = require('crypto');

class TaskID {
    constructor(id) {
        this.value = id ?? randomUUID();
        Object.freeze(this);
    }
}

module.exports = TaskID;