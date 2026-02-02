
class UserEmail {
    constructor(email) {
        if (!email) {
            throw new Error('Email is required');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }
        this.value = email.toLowerCase().trim();
        Object.freeze(this);
    }
}

module.exports = UserEmail;