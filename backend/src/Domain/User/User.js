const UserId = require('./ValueObjects/UserId');
const UserEmail = require('./ValueObjects/UserEmail');

class User {
  constructor({ id, email }) {
    this.id = id instanceof UserId ? id : new UserId(id);
    this.email = email instanceof UserEmail ? email : new UserEmail(email);
    Object.freeze(this);
  }
}

module.exports = User;