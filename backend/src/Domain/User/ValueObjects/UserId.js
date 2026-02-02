const { v4: uuidv4, validate: uuidValidate } = require('uuid');

class UserId {
    constructor(id) {
        if (id && !uuidValidate(id)) {
            throw new Error('Invalid user ID format');
        }
        this.value = id || uuidv4();
        Object.freeze(this);
    }

    static generate() {
        return new UserId(uuidv4());
    }
}

module.exports = UserId;