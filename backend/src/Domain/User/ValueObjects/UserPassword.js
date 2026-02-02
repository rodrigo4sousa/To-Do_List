class UserPassword {
    constructor(password) {
        if (!password) {
            throw new Error('Password is required');
        }
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters');
        }
        this.value = password;
        Object.freeze(this);
    }
}

module.exports = UserPassword;
